"use client";

import Link from "next/link";

interface YachtCardProps {
  yacht: {
    id: number;
    name: string;
    location: string;
    specs: string;
    price: string;
    poa: boolean;
    image: string;
    alt: string;
  };
}

export default function YachtCard({ yacht }: YachtCardProps) {
  return (
    <Link href={`/yachts/${yacht.id}`} className="yacht-card" passHref>
        <div className="yacht-image-wrapper">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={yacht.image} alt={yacht.alt} />
        <button
          className="heart-btn"
          aria-label="Toggle favorite"
          onClick={(e) => {
            e.stopPropagation();
            e.currentTarget.classList.toggle("active");
          }}
        >
          <svg viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
      <div className="card-location">{yacht.location}</div>
      <div className="card-name">{yacht.name}</div>
      <div className="card-specs">{yacht.specs}</div>
      <div className="card-price">
        {yacht.poa ? <span className="poa">POA</span> : yacht.price}
      </div>
    </Link>
  );
}
