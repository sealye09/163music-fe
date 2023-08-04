import { FC, useEffect, useState } from "react";

import { Introduction } from "@/types";
import { artistApi } from "@/service";

interface Props {
  artistId: string;
}

const Description: FC<Props> = ({ artistId }) => {
  const [introduction, setIntroduction] = useState<Introduction>();

  // description
  useEffect(() => {
    let isUnmounted = false;
    if (isUnmounted) return;

    artistApi.getArtistDescription(artistId!).then((res) => {
      setIntroduction(() => {
        return {
          // @ts-ignore
          desc: res.briefDesc,
          // @ts-ignore
          introduction: res.introduction.map((item: any) => {
            return {
              title: item.ti,
              content: item.txt,
            };
          }),
        };
      });
    });

    return () => {
      isUnmounted = true;
    };
  }, [artistId]);

  if (!introduction) return null;

  return (
    <div className="pt-8 px-5">
      <div className="pb-6">
        <h2 className="text-left text-lg font-bold pb-1">简介</h2>
        <p>{introduction.desc ? introduction.desc : "暂无介绍"}</p>
      </div>
      {introduction.introduction.map((item) => (
        <div
          key={item.title}
          className="pb-4"
        >
          <h2 className="text-left font-bold pb-1">{item.title}</h2>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Description;
