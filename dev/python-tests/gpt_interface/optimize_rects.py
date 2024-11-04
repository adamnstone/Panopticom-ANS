import random

id_counter = 0

def data_to_rects(data, threshold=100):

    def generate_rectangles(rows, cols):
        rectangles = []
        lat_step = 180 / rows
        lon_step = 360 / cols

        for lat_index in range(rows):
            for lon_index in range(cols):
                lat_min = -90 + lat_index * lat_step
                lat_max = lat_min + lat_step
                lon_min = -180 + lon_index * lon_step
                lon_max = lon_min + lon_step

                rectangles.append({
                    'lat_min': lat_min,
                    'lat_max': lat_max,
                    'lon_min': lon_min,
                    'lon_max': lon_max
                })

        return rectangles

    def assign_unique_ids(rectangles):
        global id_counter
        uq_ids = {}
        for i in rectangles:
            id_counter += 1
            uq_ids[id_counter] = i
        return uq_ids

    def assign_values(rectangles):
        rect_counts = {i: 0 for i in rectangles.keys()}
        for item in data:
            coords = item['pos']
            lat = coords['lat']
            lng = coords['lng']
            for i in rectangles.keys():
                rect = rectangles[i]
                if rect['lat_min'] <= lat < rect['lat_max'] and rect['lon_min'] <= lng < rect['lon_max']:
                    rect_counts[i] += 1
                    break
            else:
                raise Exception("coordinate in no rectangles")
        return rect_counts

    def rectangles_contained_in(coarse_rect, fine_rectangles):
        contained = []
        for fid, frect in fine_rectangles.items():
            if (coarse_rect['lat_min'] <= frect['lat_min'] and
                coarse_rect['lat_max'] >= frect['lat_max'] and
                coarse_rect['lon_min'] <= frect['lon_min'] and
                coarse_rect['lon_max'] >= frect['lon_max']):
                contained.append(fid)
        return contained

    # Generate coarse and fine rectangles
    lat_splits, lon_splits = 4, 4
    while True:
        fine_rectangles = generate_rectangles(lat_splits, lon_splits)   

        fine_rect_ids = assign_unique_ids(fine_rectangles)

        fine_rect_values = assign_values(fine_rect_ids)

        if max([fine_rect_values[_] for _ in list(fine_rect_values.keys())]) <= threshold:
            break

        lat_splits *= 2
        lon_splits *= 2

    def coarse_pass(lat_splits, lon_splits, fine_rect_ids, fine_rect_values):
        coarse_rectangles = generate_rectangles(lat_splits, lon_splits)  # 20 rectangles
        coarse_rect_ids = assign_unique_ids(coarse_rectangles)

        # Initialize final data output dictionaries
        final_rects = {}
        final_values = {}

        # Process each coarse rectangle
        for coarse_id, coarse_rect in coarse_rect_ids.items():
            contained_fine_ids = rectangles_contained_in(coarse_rect, fine_rect_ids)
            total_value = sum(fine_rect_values[fid] for fid in contained_fine_ids)
            
            if total_value < threshold:
                final_rects[coarse_id] = coarse_rect
                final_values[coarse_id] = total_value
            else:
                for fid in contained_fine_ids:
                    final_rects[fid] = fine_rect_ids[fid]
                    final_values[fid] = fine_rect_values[fid]

        # # Output results
        # print("Final Rectangles:")
        # for rid, rect in final_rects.items():
        #     print(f"ID: {rid}, Rectangle: {rect}")

        # print("\nFinal Values:")
        # for rid, value in final_values.items():
        #     print(f"ID: {rid}, Value: {value}")

        if lat_splits == lon_splits and lat_splits == 2:
            # print(final_rects, "\n\n\n", final_values)
            return final_rects, final_values
        else:
            return coarse_pass(lat_splits//2, lon_splits//2, final_rects, final_values)


    return coarse_pass(lat_splits//2, lon_splits//2, fine_rect_ids, fine_rect_values)