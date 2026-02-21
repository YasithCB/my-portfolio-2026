"use client";

import Data from "@data/sections/counters.json";
import { useEffect } from "react";
import { CountersBarAnim } from "@common/counters";

const CountersSection = () => {
  useEffect(() => {
    CountersBarAnim();
  }, []);

  return (
    <>
        {/* counters */}
        <div className="container-fluid">

        {/* row */}
        <div className="row p-30-0">
            
            {Data.items.map((item, key) => (
            <div className="col-md-3 col-6" key={`counters-item-${key}`}>
                {/* couner frame */}
                <div className="art-counter-frame">
                    {/* counter */}
                    <div className="art-counter-box">
                        {/* counter number */}
                        <span className="art-counter" data-count={item.value}>0</span>
                        <span className="art-counter-plus">{item.valueAfter}</span>
                    </div>
                    {/* counter end */}
                    {/* title */}
                    <h6>{item.label}</h6>
                </div>
                {/* couner frame end */}
            </div>
            ))}

        </div>
        {/* row end */}

        </div>
        {/* counters end */}
    </>
  );
};
export default CountersSection;