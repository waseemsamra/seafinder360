import YachtCard from "./yacht-card";
import { createServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "The Dubai Fleet | SeaFinder360",
  description: "Browse the SeaFinder360 yacht fleet in Dubai, available by the hour.",
};

async function getYachts() {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase.from('yachts').select('*').order('id');
    if (error) {
      console.error('Error fetching yachts:', error);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error('Failed to fetch yachts:', err);
    return [];
  }
}

export default async function SearchPage() {
  const yachts = await getYachts();
  
  const formattedYachts = yachts.map((yacht: any) => ({
    id: yacht.id,
    name: yacht.name,
    location: yacht.location,
    specs: `${yacht.type} · ${yacht.length} ft · ${yacht.guests} guests · ${yacht.cabins} cabins`,
    price: yacht.price ? `AED ${yacht.price.toLocaleString()} / hour · min ${yacht.min_hours || 3} h` : "",
    poa: !yacht.price,
    image: yacht.img,
    alt: yacht.name,
  }));

  const groups = [
    {
      title: "Up to 25 guests",
      count: `${formattedYachts.filter((y: any) => {
        const g = parseInt(y.specs.match(/(\d+) guests/)?.[1] || "0");
        return g <= 25;
      }).length} YACHTS`,
      yachts: formattedYachts.filter((y: any) => {
        const g = parseInt(y.specs.match(/(\d+) guests/)?.[1] || "0");
        return g <= 25;
      }),
    },
    {
      title: "25 to 50 guests",
      count: `${formattedYachts.filter((y: any) => {
        const g = parseInt(y.specs.match(/(\d+) guests/)?.[1] || "0");
        return g > 25 && g <= 50;
      }).length} YACHTS`,
      yachts: formattedYachts.filter((y: any) => {
        const g = parseInt(y.specs.match(/(\d+) guests/)?.[1] || "0");
        return g > 25 && g <= 50;
      }),
    },
    {
      title: "50+ guests",
      count: `${formattedYachts.filter((y: any) => {
        const g = parseInt(y.specs.match(/(\d+) guests/)?.[1] || "0");
        return g > 50;
      }).length} YACHTS`,
      yachts: formattedYachts.filter((y: any) => {
        const g = parseInt(y.specs.match(/(\d+) guests/)?.[1] || "0");
        return g > 50;
      }),
    },
  ];

  return (
    <>
      <header className="header">
        <div className="logo">SeaFinder360</div>
      </header>

      <section className="search-section">
        <div className="shared-container">
          <div className="search-top-row">
            <div className="search-sort-group">
              <span className="search-label">SEARCH</span>
              <input
                type="text"
                className="search-input"
                placeholder="Yacht name or builder"
              />
            </div>

            <div className="search-sort-group">
              <span className="search-label">SORT</span>
              <div className="sort-select-wrapper">
                <select className="sort-select">
                  <option>Featured first</option>
                  <option>Price: Low to High</option>
                </select>
              </div>
              <div className="yacht-count">{formattedYachts.length} yachts</div>
            </div>
          </div>

          <div className="filters-row">
            <div className="filter-group">
              <label className="filter-label">
                PRICE PER HOUR, UP TO AED <br />
                <span className="filter-value">21,500</span>
              </label>
              <div className="range-container">
                <input type="range" min="1000" max="25000" step="500" defaultValue="21500" />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">GUESTS, AT LEAST</label>
              <select className="filter-select">
                <option>Any</option>
                <option>10+</option>
                <option>20+</option>
                <option>30+</option>
                <option>50+</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">LENGTH, AT LEAST 54 FT</label>
              <div className="range-container">
                <input type="range" min="40" max="200" step="5" defaultValue="54" />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">CABINS</label>
              <select className="filter-select">
                <option>Any</option>
                <option>2+</option>
                <option>4+</option>
                <option>6+</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">MARINA</label>
              <select className="filter-select">
                <option>All marinas</option>
                <option>Dubai Harbour</option>
                <option>Marsa Al Arab</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">MINIMUM BOOKING</label>
              <select className="filter-select">
                <option>Any</option>
                <option>3 Hours</option>
                <option>4 Hours</option>
              </select>
            </div>
          </div>

          <div className="filter-bottom-row">
            <label className="checkbox-group">
              <input type="checkbox" />
              Available for the Grand Prix weekend (15)
            </label>
            <button className="reset-btn">Reset all</button>
          </div>
        </div>
      </section>

      <div className="shared-container">
        <div className="editorial-header">
          <h1>The Dubai fleet, by the hour</h1>
          <div className="showing-text">Showing {formattedYachts.length} of {formattedYachts.length}</div>
        </div>

        {groups.map((group) => (
          <div className="yacht-group" key={group.title}>
            <div className="group-header">
              <h2>{group.title}</h2>
              <span className="group-count">{group.count}</span>
            </div>
            <div className="yacht-grid">
              {group.yachts.map((yacht: any) => (
                <YachtCard key={yacht.id} yacht={yacht} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
