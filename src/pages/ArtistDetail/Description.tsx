import { FC } from "react";

import { Introduction } from "@/types";

interface Props {
  introduction: Introduction;
}

const Description: FC<Props> = ({ introduction }) => {
  return (
    <div>
      <div className="pt-8 px-5">
        <div className="pb-6">
          <h2 className="text-left text-lg font-bold pb-1">简介</h2>
          <p>{introduction.desc}</p>
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
    </div>
  );
};

export default Description;
