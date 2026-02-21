import Data from "@data/sections/pricing.json";
import Link from "next/link";

const PricingSection = () => {
    return (
        <>
        {/* pricing */}
        <div className="container-fluid">

        {/* row */}
        <div className="row p-0-0">

            {/* col */}
            <div className="col-lg-12">

            {/* section title */}
            <div className="art-section-title">
                {/* title frame */}
                <div className="art-title-frame">
                {/* title */}
                <h4 dangerouslySetInnerHTML={{__html : Data.title}} />
                </div>
                {/* title frame end */}
            </div>
            {/* section title end */}

            </div>
            {/* col end */}
            
            {Data.items.map((item, key) => (
            <div className="col-lg-4" key={`pricing-item-${key}`}>

            {/* price */}
            <div className={item.popular != 1 ? "art-a art-price" : "art-a art-price art-popular-price"}>
                {/* price body */}
                <div className="art-price-body">
                <h5 className="mb-30">{item.title}</h5>

                {/* price cost */}
                <div className="art-price-cost">
                    <div className="art-number" >
                        <span>{item.price.before}</span>
                        <div dangerouslySetInnerHTML={{__html : item.price.value}} />
                        <span>{item.price.after}</span>
                    </div>
                </div>
                {/* price cost end */}
                {/* price list */}
                <ul className="art-price-list">
                    {item.list.map((list_item, list_key) => (
                    <li key={`pricing-item-${key}-list-${list_key}`} className={list_item.active ? "" : "art-empty-item"}>{list_item.value}</li>
                    ))}
                </ul>
                {/* price list end */}
                {/* button */}
                <Link href={item.button.link} className="art-link art-color-link art-w-chevron">{item.button.label}</Link>
                <div className="art-asterisk" dangerouslySetInnerHTML={{__html : item.info}} />
                </div>
                {/* price body end */}
            </div>
            {/* price end */}

            </div>
            ))}

        </div>
        {/* row end */}

        </div>
        {/* prices end */}
        </>
    );
};

export default PricingSection;