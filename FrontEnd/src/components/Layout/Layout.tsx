import React from "react";
import Header from "../Header/header";
import Sidebar from "../Sidebar/Sidebar";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import TrackDetails from "../TrackDetails/TrackDetails";
import "./layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout-wrapper">
      <Header />
      <div className="layout-middle">
        <Sidebar>
          <main className="layout-content">{children}</main>
        </Sidebar>
      </div>
      <MusicPlayer />
      <TrackDetails />
    </div>
  );
}
