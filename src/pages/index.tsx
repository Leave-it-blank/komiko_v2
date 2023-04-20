import Image from "next/image";

import { HOMEPAGE_APITYPE } from "@/utils/types";
import { getHomePage } from "../utils/api";
import NewRelease from "../components/home/NewRelease";
import TopComics from "@/components/home/TopComics";
import Support from "@/components/layouts/Support";
import { loadDisque } from "@/utils/disque";
import { useEffect } from "react";
import { DiscussionEmbed, CommentCount } from "disqus-react";

//className={`${inter.className} mb-3 text-2xl font-semibold`}

export default function Home({
  latest,
  recommended,
  slider,
  ads,
}: HOMEPAGE_APITYPE) {
  const disq = `${process.env.NEXT_PUBLIC_COMMENT_DISQ}` ?? "mysite";
  useEffect(() => {});
  return (
    <div className={`mx-auto`}>
      <div className="pt-10"> </div>
      <div className="max-w-screen-2xl flex  flex-col mx-auto min-h-screen">
        <div className="flex flex-col my-2 mx-auto">
          <NewRelease latest={latest} />
        </div>
        <div className="flex flex-col my-2 mx-auto">
          <TopComics recommended={recommended} />
        </div>

        <div className="flex flex-col my-2 mx-auto w-full">
          <div className="md:pl-20 w-full">
            <div className="py-3 w-full ">
              <div className="rounded-xl   px-3 bg-sky-300 dark:bg-neutral-900  py-2 text-sky-700 ">
                <div className="text-xl flex justify-center w-full items-center mb-3">
                  <CommentCount
                    shortname={disq}
                    config={{
                      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/`,
                      identifier: "komikoHome",
                      title: "HomePage Komiko",
                    }}
                  >
                    {/* Placeholder Text */}
                    Loading.. Comments..
                  </CommentCount>
                </div>

                <DiscussionEmbed
                  shortname={disq}
                  config={{
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/`,
                    identifier: "komikoHome",
                    title: "HomePage Komiko",
                    language: "en", //e.g. for Traditional Chinese (Taiwan)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="md:pl-20 ">
          <Support />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const { latest, recommended, slider, ads } = await getHomePage();
  return {
    props: {
      latest: latest,
      recommended: recommended,
      slider: slider,
      ads: ads,
    },
    revalidate: 10,
  };
}
