import Data from '@data/sections/partners';

const PartnersSlider = ( { paddingTop } ) => {
  return (
    <>
    {/* partners */}
    <div className="container-fluid">

    {/* row */}
    <div className={`row p-${paddingTop}-0`}>

        {/* col */}
        {Data.items.map((item, key) => (
        <div className="col-3 col-lg-2" key={`partners-slider-item-${key}`}>
            {/* brand */}
            <img className="art-brand" src={item.image} alt={item.alt} />
        </div>
        ))}
        {/* col end */}

    </div>
    {/* row end */}

    </div>
    {/* partners end */}
    </>
  );
};
export default PartnersSlider;