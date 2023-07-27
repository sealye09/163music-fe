import { HTMLAttributes } from "react";

export type Track = {
  song: {
    id: number;
    name: string;
  };
  artist: {
    id: number;
    name: string;
  };
  album: {
    id: number;
    name: string;
    picUrl: string;
  };
};

export type HeadLine = {
  title: string;
  target: string;
};

export type Tag = {
  id: number;
  title: string;
  target: string;
};

export type PlaylistInfo = {
  id: number;
  name: string;
  coverImgUrl: string;
};

export type PlaylistInfoDetail = PlaylistInfo & {
  tags: string[];
  description: string;
  trackCount?: number;
  playCount?: number;
};

export type NavBarItemConfig = HTMLAttributes<HTMLElement> & {
  itemId: number;
  itemText: string;
  linkTo: string;
  newTab?: boolean;
  active?: boolean;
  activeClass?: string;
};

export type BasisInfo = {
  id: number;
  name: string;
};

export type ArtistInfo = {
  id: number;
  name: string;
  picUrl: string;
};

export type RawArtistInfo = {
  id: number;
  name: string;
  img1v1Url: string;
};

export type RawSongInfo = {
  id: number;
  name: string;
  ar: [{ id: number; name: string }];
  al: { id: number; name: string; picUrl: string };
};

export type AlbumInfo = {
  id: number;
  name: string;
  coverImgUrl: string;
  description: string;
  artist: {
    id: number;
    name: string;
  };
};

export type RawAlbumInfo = {
  id: number;
  name: string;
  picUrl: string;
  description: string;
  artists: Array<{ id: number; name: string }>;
};

export type Introduction = {
  desc: string;
  introduction: Array<{
    title: string;
    content: string;
  }>;
};
