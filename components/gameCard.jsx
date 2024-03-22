import "../app/pages/profiles/style.css";
import React from "react";
import Image from "react-bootstrap/Image";

export default function SupportedGames() {
  return (
    <div class="card-group card-group-scroll">
      <div class="card">
        <Image
          src="/Apex Legends.jpg"
          class="card-img-top"
          alt="Apex Legends"
        />
      </div>
      <div class="card">
        <Image src="/dota 2.jpg" class="card-img-top" alt="Palm Springs Road" />
      </div>
      <div class="card">
        <Image
          src="/Fortnite.jpg"
          class="card-img-top"
          alt="Palm Springs Road"
        />
      </div>
      <div class="card">
        <Image
          src="/warzone.jpg"
          class="card-img-top"
          alt="Palm Springs Road"
        />
      </div>
      <div class="card">
        <Image
          src="/destiny2.jpg"
          class="card-img-top"
          alt="Palm Springs Road"
        />
      </div>
      <div class="card">
        <Image
          src="/minecraft.jpg"
          class="card-img-top"
          alt="Palm Springs Road"
        />
      </div>
    </div>
  );
}
