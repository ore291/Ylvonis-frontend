import Link from "next/link";
import { useRouter, NextRouter } from "next/router";
import { ReactNode } from "react";

// export const SideBarActive = ({
//   children,
//   href,
// }: {
//   children: ReactNode;
//   href: string;
// }) => {
//   const router = useRouter();

//   const className =
//     router.asPath.includes(`${href}/`) || router.asPath === href
//       ? "gradLink md:flex  "
//       : "text-gray-500 md:flex ";

//   return <Link href={href} className={className}>
//       {children}
//     </Link>
//   ;
// };

export const sideBarActive = (router: NextRouter, href: string) => {
  const className =
    router.asPath.includes(`${href}/`) || router.asPath === href
      ? "gradText  "
      : "text-utilGray ";

  return className;
};

export const tracks = {
  playlist: {
    __typename: "Playlist",
    id: "d5484bc3-f498-457f-9281-003f03e1fff9",
    title: "Popular songs - lofi hip hop mix 🔥",
    imageUrl:
      "https://res.cloudinary.com/dehs50yqa/image/upload/v1650561583/2_tmgz9r.jpg",
    tracks: [
      {
        __typename: "Track",
        id: "763c9ece-cd7d-478d-97d6-6960bd351729",
        title: "Rumors🔥",
        url: "https://res.cloudinary.com/dehs50yqa/video/upload/v1650561996/Songs/NEFFEX_-_Rumors_l49wis.mp3",
        artist: { __typename: "Artist",id: "1", url: "#",title: "#", name: "NEFFEX" },
      },
      {
        __typename: "Track",
        id: "6d4e0411-bef7-44a5-b6c4-4e6602a76609",
        title: "Gangsta's Paradise - Lofi Fruits Music",
        url: "https://res.cloudinary.com/dehs50yqa/video/upload/v1650735677/Songs/Gangsta_s_Paradise_-_Lofi_Fruits_Music_hhhxzf.mp3",
        artist: { __typename: "Artist",id: "2", url: "#",title: "#", name: "Lofi Fruits" },
      },
      {
        __typename: "Track",
        id: "5227663d-9493-4b52-ac57-03747e4b9290",
        title: "Mood (Lofi)",
        url: "https://res.cloudinary.com/dehs50yqa/video/upload/v1650561933/Songs/Mood_Lofi_cirjjc.mp3",
        artist: { __typename: "Artist",id: "3", url: "#",title: "#", name: "Salem ilese" },
      },
    ],
  },
};
