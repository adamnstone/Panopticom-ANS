import React from 'react'
import { useSearchParams } from 'react-router-dom';

const AIDashboard = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const selected_layer_ids = searchParams.get("selected_layer_ids");
    const coordinates = searchParams.get("coordinates");
    const focus_datapoint = searchParams.get("focus_datapoint");
    const narrative_summary = searchParams.get("narrative_summary");
  return (
    <>
    <div>selected_layer_ids: {selected_layer_ids}</div>
    <div>coordinates: {coordinates}</div>
    <div>focus_datapoint: {focus_datapoint}</div>
    <div>narrative_summary: {narrative_summary}</div>
    </>
  )
}

export default AIDashboard