import { useRef, useState } from "react";
import type { Map as LeafletMap } from "leaflet";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type IconName =
  | "grid"
  | "chart"
  | "plant"
  | "settings"
  | "bell"
  | "chevron"
  | "thermometer"
  | "droplet"
  | "cloud-rain"
  | "water"
  | "clock"
  | "calendar"
  | "check"
  | "sun"
  | "menu"
  | "close"
  | "map"
  | "pin"
  | "search"
  | "plus"
  | "minus"
  | "signal";

const iconPaths: Record<IconName, React.ReactNode> = {
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19V9" />
      <path d="M10 19V5" />
      <path d="M16 19v-7" />
      <path d="M22 19H2" />
    </>
  ),
  plant: (
    <>
      <path d="M12 22V10" />
      <path d="M12 13C7 13 4 10 4 5c5 0 8 3 8 8Z" />
      <path d="M12 17c5 0 8-3 8-8-5 0-8 3-8 8Z" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.08A1.7 1.7 0 0 0 9 19.36a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.63 15 1.7 1.7 0 0 0 3.08 14H3v-4h.08A1.7 1.7 0 0 0 4.64 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.63 1.7 1.7 0 0 0 10 3.08V3h4v.08A1.7 1.7 0 0 0 15 4.64a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.37 9 1.7 1.7 0 0 0 20.92 10H21v4h-.08A1.7 1.7 0 0 0 19.4 15Z" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </>
  ),
  chevron: <path d="m9 18 6-6-6-6" />,
  thermometer: (
    <>
      <path d="M14 14.76V5a2 2 0 0 0-4 0v9.76a4 4 0 1 0 4 0Z" />
      <path d="M12 9v7" />
    </>
  ),
  droplet: <path d="M12 2.7S5.5 10 5.5 15a6.5 6.5 0 0 0 13 0C18.5 10 12 2.7 12 2.7Z" />,
  "cloud-rain": (
    <>
      <path d="M16 13a4 4 0 0 0-.8-7.92A6 6 0 0 0 4.3 8.6 3.5 3.5 0 0 0 5.5 15H16" />
      <path d="m8 19-1 2" />
      <path d="m12 17-1 2" />
      <path d="m16 19-1 2" />
    </>
  ),
  water: (
    <>
      <path d="M4 14c5 0 7-3 8-8 1 5 3 8 8 8" />
      <path d="M6 18h12" />
      <path d="M9 22h6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12M18 6 6 18" />
    </>
  ),
  map: (
    <>
      <path d="m3 6 5-3 8 3 5-3v15l-5 3-8-3-5 3Z" />
      <path d="M8 3v15M16 6v15" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  signal: (
    <>
      <path d="M5 12.55a11 11 0 0 1 14 0" />
      <path d="M8.5 16a6 6 0 0 1 7 0" />
      <path d="M12 20h.01" />
    </>
  ),
};

function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}

const sensorCards = [
  {
    label: "Suhu udara",
    value: "28.4",
    unit: "°C",
    meta: "Normal",
    icon: "thermometer" as IconName,
    tone: "amber",
    detail: "Rentang 24–32°C",
  },
  {
    label: "Kelembapan tanah",
    value: "64",
    unit: "%",
    meta: "Optimal",
    icon: "droplet" as IconName,
    tone: "blue",
    detail: "Target 55–75%",
  },
  {
    label: "Curah hujan",
    value: "2.8",
    unit: "mm",
    meta: "Hujan ringan",
    icon: "cloud-rain" as IconName,
    tone: "indigo",
    detail: "24 jam terakhir",
  },
];

const zones = [
  {
    name: "Kebun Sayur",
    plant: "Tomat & Cabai",
    moisture: 68,
    status: "Optimal",
    color: "#4b8b6b",
  },
  {
    name: "Area Herbal",
    plant: "Mint & Kemangi",
    moisture: 57,
    status: "Perlu dipantau",
    color: "#d69638",
  },
  {
    name: "Greenhouse",
    plant: "Selada Hidroponik",
    moisture: 74,
    status: "Optimal",
    color: "#4b8b6b",
  },
];

const devices = [
  {
    id: "ALT-001",
    name: "Sensor Kebun Utara",
    zone: "Kebun Sayur",
    lat: -6.5928,
    lng: 106.8026,
    moisture: 68,
    temperature: 28.4,
    rainfall: 2.8,
    battery: 86,
    status: "Online",
    updated: "1 menit lalu",
  },
  {
    id: "ALT-002",
    name: "Sensor Area Herbal",
    zone: "Area Herbal",
    lat: -6.6006,
    lng: 106.8115,
    moisture: 57,
    temperature: 29.1,
    rainfall: 2.4,
    battery: 72,
    status: "Online",
    updated: "2 menit lalu",
  },
  {
    id: "ALT-003",
    name: "Kontrol Greenhouse",
    zone: "Greenhouse",
    lat: -6.5912,
    lng: 106.8167,
    moisture: 74,
    temperature: 26.8,
    rainfall: 0,
    battery: 91,
    status: "Online",
    updated: "Baru saja",
  },
  {
    id: "ALT-004",
    name: "Katup Lahan Barat",
    zone: "Lahan Barat",
    lat: -6.6058,
    lng: 106.7974,
    moisture: 42,
    temperature: 30.2,
    rainfall: 1.8,
    battery: 24,
    status: "Perlu perhatian",
    updated: "8 menit lalu",
  },
];

function WebGisPage() {
  const [selectedId, setSelectedId] = useState(devices[0].id);
  const [filter, setFilter] = useState("Semua alat");
  const [search, setSearch] = useState("");
  const mapRef = useRef<LeafletMap | null>(null);
  const selectedDevice = devices.find((device) => device.id === selectedId) ?? devices[0];
  const visibleDevices = devices.filter((device) => {
    const matchesStatus = filter !== "Perlu perhatian" || device.status === "Perlu perhatian";
    const searchTerm = search.toLowerCase();
    const matchesSearch =
      device.name.toLowerCase().includes(searchTerm) ||
      device.id.toLowerCase().includes(searchTerm) ||
      device.zone.toLowerCase().includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const selectDevice = (device: (typeof devices)[number]) => {
    setSelectedId(device.id);
    mapRef.current?.flyTo([device.lat, device.lng], Math.max(mapRef.current.getZoom(), 16), {
      duration: 0.7,
    });
  };

  return (
    <div className="mx-auto max-w-[1450px] p-5 md:p-8 xl:p-10">
      <section className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#4b8265]">
            <span className="size-1.5 rounded-full bg-[#56a379]" /> 4 perangkat terhubung
          </p>
          <h2 className="text-2xl font-bold tracking-[-0.035em] md:text-[30px]">
            Peta lokasi alat
          </h2>
          <p className="mt-2 text-xs text-[#7f8b83]">
            Pantau posisi dan kondisi perangkat irigasi secara langsung.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-[#dde4dd] bg-white p-1">
          {["Semua alat", "Perlu perhatian"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-lg px-3.5 py-2 text-xs font-bold transition ${filter === item ? "bg-[#e8f0ea] text-[#2f694e]" : "text-[#879189] hover:text-[#536158]"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <div className="relative min-h-[600px] overflow-hidden rounded-2xl border border-[#dbe3db] bg-[#dfe9dc] shadow-[0_8px_30px_rgba(34,60,44,.08)]">
          <MapContainer
            ref={mapRef}
            center={[-6.5985, 106.807]}
            zoom={14}
            minZoom={11}
            maxZoom={19}
            zoomControl={false}
            scrollWheelZoom
            className="absolute inset-0 z-0 size-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
            />
            {visibleDevices.map((device) => (
              <CircleMarker
                key={device.id}
                center={[device.lat, device.lng]}
                radius={selectedId === device.id ? 12 : 9}
                pathOptions={{
                  color: "#ffffff",
                  weight: 3,
                  fillColor: device.status === "Online" ? "#397a58" : "#c48630",
                  fillOpacity: 1,
                }}
                eventHandlers={{ click: () => selectDevice(device) }}
              >
                <Popup>
                  <div className="min-w-[170px]">
                    <p className="!m-0 text-xs font-bold">{device.name}</p>
                    <p className="!mb-3 !mt-1 text-[10px] text-[#738078]">
                      {device.id} · {device.zone}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <span className="rounded-md bg-[#eef4ef] px-2 py-1.5">
                        Tanah <b>{device.moisture}%</b>
                      </span>
                      <span className="rounded-md bg-[#fff3df] px-2 py-1.5">
                        Suhu <b>{device.temperature}°</b>
                      </span>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>

          <div className="absolute left-4 top-4 z-[500] flex w-[min(310px,calc(100%-5rem))] items-center gap-2 rounded-xl border border-white/70 bg-white/95 px-3.5 py-3 shadow-lg backdrop-blur">
            <Icon name="search" size={17} className="text-[#728078]" />
            <input
              className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#9ca69f]"
              placeholder="Cari lokasi atau ID alat..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="absolute right-4 top-4 z-[500] flex flex-col overflow-hidden rounded-xl border border-[#dbe3dc] bg-white shadow-lg">
            <button
              className="grid size-10 place-items-center text-[#53645a] hover:bg-[#eff3ef]"
              onClick={() => mapRef.current?.zoomIn()}
              aria-label="Perbesar peta"
            >
              <Icon name="plus" size={17} />
            </button>
            <button
              className="grid size-10 place-items-center border-t border-[#e8ece8] text-[#53645a] hover:bg-[#eff3ef]"
              onClick={() => mapRef.current?.zoomOut()}
              aria-label="Perkecil peta"
            >
              <Icon name="minus" size={17} />
            </button>
          </div>
          <div className="absolute bottom-7 left-5 z-[500] flex items-center gap-3 rounded-xl bg-[#203f31]/90 px-4 py-3 text-white shadow-lg backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#8dd3a6] opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-[#79c796]" />
            </span>
            <div>
              <p className="text-[10px] font-bold">Sinkronisasi aktif</p>
              <p className="text-[9px] text-white/60">Diperbarui baru saja</p>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <article className="panel overflow-hidden !p-0">
            <div className="border-b border-[#e7ece7] bg-[#f7f9f6] p-5">
              <div className="mb-4 flex items-center justify-between">
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${selectedDevice.status === "Online" ? "bg-[#e7f3eb] text-[#357352]" : "bg-[#fbefdd] text-[#a76c22]"}`}
                >
                  {selectedDevice.status}
                </span>
                <span className="text-[10px] text-[#909a93]">{selectedDevice.updated}</span>
              </div>
              <h3 className="text-base font-bold">{selectedDevice.name}</h3>
              <p className="mt-1 text-[11px] text-[#829087]">
                {selectedDevice.id} · {selectedDevice.zone}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-[#e8ece8]">
              <div className="bg-white p-4">
                <Icon name="droplet" size={17} className="mb-3 text-[#49838b]" />
                <p className="text-[10px] text-[#8b968e]">Kelembapan</p>
                <p className="mt-1 text-lg font-bold">{selectedDevice.moisture}%</p>
              </div>
              <div className="bg-white p-4">
                <Icon name="thermometer" size={17} className="mb-3 text-[#c47b24]" />
                <p className="text-[10px] text-[#8b968e]">Suhu udara</p>
                <p className="mt-1 text-lg font-bold">{selectedDevice.temperature}°</p>
              </div>
              <div className="bg-white p-4">
                <Icon name="cloud-rain" size={17} className="mb-3 text-[#6669a2]" />
                <p className="text-[10px] text-[#8b968e]">Curah hujan</p>
                <p className="mt-1 text-lg font-bold">{selectedDevice.rainfall} mm</p>
              </div>
              <div className="bg-white p-4">
                <Icon name="signal" size={17} className="mb-3 text-[#4b8b6b]" />
                <p className="text-[10px] text-[#8b968e]">Baterai alat</p>
                <p className="mt-1 text-lg font-bold">{selectedDevice.battery}%</p>
              </div>
            </div>
            <div className="p-4">
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2f6f51] py-3 text-xs font-bold text-white transition hover:bg-[#285f46]">
                <Icon name="chart" size={16} /> Lihat detail perangkat
              </button>
            </div>
          </article>

          <article className="panel">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="panel-title">Daftar perangkat</h3>
              <span className="text-[10px] font-bold text-[#7b887f]">
                {visibleDevices.length} alat
              </span>
            </div>
            <div className="space-y-2">
              {visibleDevices.map((device) => (
                <button
                  key={device.id}
                  onClick={() => selectDevice(device)}
                  className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${selectedId === device.id ? "border-[#9cbba7] bg-[#eff5f0]" : "border-[#e7ebe7] hover:bg-[#f7f9f7]"}`}
                >
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-lg ${device.status === "Online" ? "bg-[#e2efe6] text-[#397455]" : "bg-[#faecd7] text-[#ad7025]"}`}
                  >
                    <Icon name="pin" size={15} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[11px] font-bold">{device.name}</span>
                    <span className="mt-0.5 block text-[9px] text-[#929c95]">
                      {device.zone} · {device.moisture}%
                    </span>
                  </span>
                  <span
                    className={`ml-auto size-2 shrink-0 rounded-full ${device.status === "Online" ? "bg-[#58a278]" : "bg-[#d5963d]"}`}
                  />
                </button>
              ))}
            </div>
          </article>
        </aside>
      </section>
    </div>
  );
}

function App() {
  const [autoMode, setAutoMode] = useState(true);
  const [watering, setWatering] = useState(false);
  const [range, setRange] = useState("24 jam");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState<"dashboard" | "webgis">("dashboard");

  const startWatering = () => {
    setWatering(true);
    window.setTimeout(() => setWatering(false), 3000);
  };

  const openPage = (page: "dashboard" | "webgis") => {
    setActivePage(page);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#f4f6f2] text-[#18231d]">
      {sidebarOpen && (
        <button
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          aria-label="Tutup navigasi"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[250px] flex-col border-r border-[#e0e7df] bg-[#fbfcfa] px-4 py-6 transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-9 flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-[#327155] text-white">
              <Icon name="plant" size={22} />
            </div>
            <div>
              <p className="text-[17px] font-bold tracking-[-0.02em]">Tumbuh</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#829087]">
                Smart irrigation
              </p>
            </div>
          </div>
          <button className="text-[#637168] lg:hidden" onClick={() => setSidebarOpen(false)}>
            <Icon name="close" />
          </button>
        </div>
        <nav className="space-y-1.5">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#a0aaa3]">
            Menu utama
          </p>
          <button
            className={`nav-item w-full ${activePage === "dashboard" ? "active" : ""}`}
            onClick={() => openPage("dashboard")}
          >
            <Icon name="grid" size={19} />
            <span>Dashboard</span>
          </button>
          <button
            className={`nav-item w-full ${activePage === "webgis" ? "active" : ""}`}
            onClick={() => openPage("webgis")}
          >
            <Icon name="map" size={19} />
            <span>WEB GIS</span>
            <span className="ml-auto flex items-center gap-1.5 text-[9px] font-bold text-[#4c8768]">
              <span className="size-1.5 rounded-full bg-[#56a379]" /> LIVE
            </span>
          </button>
          <a className="nav-item" href="#analitik">
            <Icon name="chart" size={19} />
            <span>Analitik</span>
          </a>
          <a className="nav-item" href="#zona">
            <Icon name="plant" size={19} />
            <span>Zona tanaman</span>
            <span className="ml-auto rounded-full bg-[#edf1ec] px-2 py-0.5 text-[10px] font-bold">
              3
            </span>
          </a>
          <a className="nav-item" href="#pengaturan">
            <Icon name="settings" size={19} />
            <span>Pengaturan</span>
          </a>
        </nav>
        <div className="mt-auto rounded-2xl bg-[#eaf1eb] p-4">
          <div className="mb-3 flex size-9 items-center justify-center rounded-full bg-white text-[#347357]">
            <Icon name="water" size={19} />
          </div>
          <p className="text-sm font-bold">Hemat air 18%</p>
          <p className="mt-1 text-xs leading-5 text-[#6a776f]">
            Otomasi telah menghemat 124 L air minggu ini.
          </p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white">
            <div className="h-full w-[68%] rounded-full bg-[#4b8b6b]" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3 border-t border-[#e6ebe5] px-2 pt-4">
          <div className="grid size-9 place-items-center rounded-full bg-[#d8e6da] text-xs font-bold text-[#35654d]">
            AK
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-bold">Ari Kurniawan</p>
            <p className="truncate text-[11px] text-[#869188]">Pengelola kebun</p>
          </div>
          <Icon name="chevron" size={15} className="ml-auto text-[#9aa49d]" />
        </div>
      </aside>

      <main className="min-h-screen lg:ml-[250px]">
        <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-[#e1e7e0] bg-[#f8faf7]/90 px-5 backdrop-blur-md md:px-8 xl:px-10">
          <div className="flex items-center gap-3">
            <button
              className="grid size-10 place-items-center rounded-xl border border-[#dfe5df] bg-white text-[#536158] lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Icon name="menu" />
            </button>
            <div>
              <h1 className="text-lg font-bold tracking-[-0.02em] md:text-xl">
                {activePage === "dashboard" ? "Selamat Pagi" : "WEB GIS"}
              </h1>
              <p className="hidden text-xs text-[#79857d] sm:block">
                {activePage === "dashboard"
                  ? "Pantau kondisi kebunmu hari ini."
                  : "Lokasi perangkat irigasi pintar."}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="hidden items-center gap-2 rounded-full border border-[#dfe6df] bg-white px-3.5 py-2 text-xs font-semibold text-[#58665d] md:flex">
              <Icon name="sun" size={16} className="text-[#d49536]" /> Cerah, 28°C
            </div>
            <button className="relative grid size-10 place-items-center rounded-full border border-[#dfe6df] bg-white text-[#526057]">
              <Icon name="bell" size={18} />
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#d36a55] ring-2 ring-white" />
            </button>
          </div>
        </header>

        {activePage === "webgis" ? (
          <WebGisPage />
        ) : (
          <div className="mx-auto max-w-[1450px] p-5 md:p-8 xl:p-10">
            <section className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#4b8265]">
                  <span className="size-1.5 rounded-full bg-[#56a379]" /> Semua sistem normal
                </p>
                <h2 className="text-2xl font-bold tracking-[-0.035em] md:text-[30px]">
                  Ringkasan kebun
                </h2>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-[#dde4dd] bg-white p-1">
                {["24 jam", "7 hari", "30 hari"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setRange(item)}
                    className={`rounded-lg px-3.5 py-2 text-xs font-bold transition ${range === item ? "bg-[#e8f0ea] text-[#2f694e]" : "text-[#879189] hover:text-[#536158]"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
              {sensorCards.map((card) => (
                <article key={card.label} className="sensor-card">
                  <div className={`icon-box ${card.tone}`}>
                    <Icon name={card.icon} size={22} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-[#76827a]">{card.label}</p>
                      <span className="status-pill">
                        <span className="size-1.5 rounded-full bg-[#4f9a71]" />
                        {card.meta}
                      </span>
                    </div>
                    <p className="mt-3 text-[31px] font-bold tracking-[-0.04em]">
                      {card.value}
                      <span className="ml-1 text-base font-semibold text-[#748078]">
                        {card.unit}
                      </span>
                    </p>
                    <p className="mt-1 text-[11px] text-[#9aa39d]">{card.detail}</p>
                  </div>
                </article>
              ))}
            </section>

            <section className="mt-4 grid gap-4 xl:grid-cols-[1.55fr_.85fr]" id="analitik">
              <article className="panel min-w-0">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h3 className="panel-title">Tren kelembapan tanah</h3>
                    <p className="panel-subtitle">Rata-rata seluruh zona · {range} terakhir</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#718078]">
                    <span className="size-2 rounded-full bg-[#4b8b6b]" /> Kelembapan
                  </div>
                </div>
                <div className="relative h-[230px] w-full">
                  <div className="absolute inset-0 flex flex-col justify-between pb-7 text-[10px] text-[#a0aaa3]">
                    {[80, 70, 60, 50, 40].map((v) => (
                      <div key={v} className="flex items-center gap-3">
                        <span className="w-5">{v}%</span>
                        <div className="h-px flex-1 bg-[#edf0ec]" />
                      </div>
                    ))}
                  </div>
                  <svg
                    className="absolute bottom-7 left-8 h-[185px] w-[calc(100%-2rem)] overflow-visible"
                    preserveAspectRatio="none"
                    viewBox="0 0 800 185"
                  >
                    <defs>
                      <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#78aa8c" stopOpacity=".32" />
                        <stop offset="100%" stopColor="#78aa8c" stopOpacity=".02" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 115 C55 120 70 83 130 88 S210 118 266 94 S340 38 405 54 S485 108 545 82 S624 57 675 67 S750 48 800 35 L800 185 L0 185Z"
                      fill="url(#area)"
                    />
                    <path
                      d="M0 115 C55 120 70 83 130 88 S210 118 266 94 S340 38 405 54 S485 108 545 82 S624 57 675 67 S750 48 800 35"
                      fill="none"
                      stroke="#4b8b6b"
                      strokeWidth="3"
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="800"
                      cy="35"
                      r="5"
                      fill="#fff"
                      stroke="#4b8b6b"
                      strokeWidth="3"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                  <div className="absolute inset-x-8 bottom-0 flex justify-between text-[10px] font-medium text-[#9aa39d]">
                    <span>00:00</span>
                    <span>04:00</span>
                    <span>08:00</span>
                    <span>12:00</span>
                    <span>16:00</span>
                    <span>20:00</span>
                    <span>24:00</span>
                  </div>
                </div>
              </article>

              <article className="panel flex flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="panel-title">Kontrol penyiraman</h3>
                    <p className="panel-subtitle">Sistem otomatis aktif</p>
                  </div>
                  <button
                    role="switch"
                    aria-checked={autoMode}
                    onClick={() => setAutoMode(!autoMode)}
                    className={`relative h-7 w-12 rounded-full transition ${autoMode ? "bg-[#39785a]" : "bg-[#c8d0ca]"}`}
                  >
                    <span
                      className={`absolute top-1 size-5 rounded-full bg-white shadow transition-all ${autoMode ? "left-6" : "left-1"}`}
                    />
                  </button>
                </div>
                <div className="my-6 rounded-2xl bg-[#eef4ef] p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-xl bg-white text-[#3d7e5e] shadow-sm">
                      <Icon name="clock" size={20} />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[#718078]">Jadwal berikutnya</p>
                      <p className="text-sm font-bold">Hari ini, 17:30</p>
                    </div>
                    <span className="ml-auto text-xs font-semibold text-[#4c7f64]">12 menit</span>
                  </div>
                </div>
                <div className="mb-5 flex items-center justify-between text-xs">
                  <span className="text-[#7b877f]">Zona aktif</span>
                  <span className="font-bold">Kebun Sayur</span>
                </div>
                <button
                  onClick={startWatering}
                  disabled={watering}
                  className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-[#2f6f51] px-4 py-3.5 text-xs font-bold text-white shadow-[0_8px_20px_rgba(47,111,81,.18)] transition hover:bg-[#285f46] disabled:cursor-wait disabled:bg-[#579076]"
                >
                  <Icon name={watering ? "check" : "water"} size={18} />
                  {watering ? "Penyiraman dimulai" : "Siram sekarang"}
                </button>
                <p className="mt-3 text-center text-[10px] text-[#969f99]">
                  {autoMode ? "Otomasi menyesuaikan kondisi cuaca" : "Mode manual sedang digunakan"}
                </p>
              </article>
            </section>

            <section className="mt-4 grid gap-4 xl:grid-cols-[1.55fr_.85fr]" id="zona">
              <article className="panel">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="panel-title">Kondisi per zona</h3>
                    <p className="panel-subtitle">Pembaruan sensor waktu nyata</p>
                  </div>
                  <button className="text-xs font-bold text-[#39785a]">Lihat semua</button>
                </div>
                <div className="divide-y divide-[#edf0ed]">
                  {zones.map((zone) => (
                    <div
                      key={zone.name}
                      className="grid items-center gap-3 py-3.5 first:pt-1 sm:grid-cols-[1.1fr_1fr_auto]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid size-9 place-items-center rounded-xl bg-[#eef3ee] text-[#47795e]">
                          <Icon name="plant" size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-bold">{zone.name}</p>
                          <p className="mt-0.5 text-[10px] text-[#929c95]">{zone.plant}</p>
                        </div>
                      </div>
                      <div>
                        <div className="mb-1.5 flex justify-between text-[10px]">
                          <span className="text-[#8a958d]">Kelembapan</span>
                          <span className="font-bold">{zone.moisture}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[#edf0ed]">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${zone.moisture}%`, background: zone.color }}
                          />
                        </div>
                      </div>
                      <span
                        className={`justify-self-start rounded-full px-2.5 py-1 text-[10px] font-bold sm:justify-self-end ${zone.status === "Optimal" ? "bg-[#eaf3ed] text-[#397455]" : "bg-[#fbf1df] text-[#a56b1d]"}`}
                      >
                        {zone.status}
                      </span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="panel">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="panel-title">Aktivitas terbaru</h3>
                    <p className="panel-subtitle">Riwayat sistem hari ini</p>
                  </div>
                  <Icon name="calendar" size={18} className="text-[#87928a]" />
                </div>
                <div className="space-y-5">
                  <div className="activity">
                    <span className="activity-dot green">
                      <Icon name="check" size={12} />
                    </span>
                    <div>
                      <p>Penyiraman selesai</p>
                      <span>Kebun Sayur · 08:12</span>
                    </div>
                    <b>8 L</b>
                  </div>
                  <div className="activity">
                    <span className="activity-dot blue">
                      <Icon name="cloud-rain" size={12} />
                    </span>
                    <div>
                      <p>Hujan terdeteksi</p>
                      <span>Semua zona · 06:45</span>
                    </div>
                    <b>2.8 mm</b>
                  </div>
                  <div className="activity">
                    <span className="activity-dot amber">
                      <Icon name="droplet" size={12} />
                    </span>
                    <div>
                      <p>Kelembapan rendah</p>
                      <span>Area Herbal · 05:30</span>
                    </div>
                    <b>42%</b>
                  </div>
                </div>
              </article>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
