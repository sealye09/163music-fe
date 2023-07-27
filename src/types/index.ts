import { HTMLAttributes } from "react";

type IdAndName = {
  id: number;
  name: string;
};

type Album = IdAndName & {
  coverImgUrl: string;
};

export type BasisInfo = IdAndName;

export type Track = {
  song: IdAndName;
  artist: IdAndName;
  album: IdAndName & {
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

export type PlaylistInfo = Album;

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

export type ArtistInfo = IdAndName & {
  picUrl: string;
};

export type RawArtistInfo = IdAndName & {
  img1v1Url: string;
};

export type RawSongInfo = IdAndName & {
  ar: [{ id: number; name: string }];
  al: { id: number; name: string; picUrl: string };
};

export type AlbumInfo = IdAndName & {
  coverImgUrl: string;
  description: string;
  artist: IdAndName;
};

export type RawAlbumInfo = IdAndName & {
  picUrl: string;
  description: string;
  artists: { id: number; name: string }[];
};

export type Introduction = {
  desc: string;
  introduction: {
    title: string;
    content: string;
  }[];
};
