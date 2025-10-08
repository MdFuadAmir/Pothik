import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import districts from "../../../public/locations.json"
import "leaflet/dist/leaflet.css";
import SectionTitle from "../../Shared/Sectiontitle/SectionTitle";
import CovrageDetails from "./CovrageDetails";
// custom marker icon
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
function ChangeView({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, 12, { animate: true });
    }
  }, [coords, map]);
  return null;
}
const Covrage = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [filtered, setFiltered] = useState(districts);
  const mapRef = useRef();

  const handleSearch = (value) => {
    setSearch(value);
    if (value.trim() === "") {
      setFiltered(districts);
      setSelected(null);
      return;
    }
    const result = districts.filter(
      (d) =>
        d.district.toLowerCase().includes(value.toLowerCase()) ||
        d.city.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(result);
    if (result.length > 0) {
      setSelected([result[0].latitude, result[0].longitude]); // first match zoom
    }
  };
  return (
     <section className="py-12 bg-indigo-50">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle sectionTitle={'Covrage'} sectionSubTitle={'Our services centers all over in bangladesh'}></SectionTitle>
         {/* search bar */}
        <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">We are Available in 64 district</h2>
          <input
            type="text"
            placeholder="Search district/city..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="input input-bordered w-full md:w-1/2"
          />
        </div>
        <div className="flex justify-center gap-4 flex-col-reverse md:flex-row">
            <div className="w-full md:w-1/2">
            <h2 className="text-xl font-bold mb-4">All Locations:</h2>
                {
                    districts.map((dist,index)=><CovrageDetails key={index} dist={dist}></CovrageDetails>)
                }
            </div>
            {/* map */}
        <MapContainer
          center={[23.685, 90.3563]} // Bangladesh center
          zoom={7}
          style={{ height: "700px", width: "100%"}}
          ref={mapRef}
          className="rounded-2xl w-full md:w-1/2"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {filtered.map((d, i) => (
            <Marker
              key={i}
              position={[d.latitude, d.longitude]}
              icon={markerIcon}
            >
              <Popup>
                <div>
                  <h3 className="font-bold">{d.district}</h3>
                  <p>
                    <b>City:</b> {d.city}
                  </p>
                  <p>
                    <b>Covered Areas:</b> {d.covered_area.join(", ")}
                  </p>
                  <img
                    src={d.flowchart}
                    alt={d.district}
                    className="mt-2 w-40"
                  />
                </div>
              </Popup>
            </Marker>
          ))}
          <ChangeView coords={selected} />
        </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default Covrage;
