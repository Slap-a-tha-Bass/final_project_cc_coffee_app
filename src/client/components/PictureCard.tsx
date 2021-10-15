import React from 'react';

const PictureCard = (props: IPictureCardProps) => {
    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="card border border-info mt-2 d-inline-block">
                    <div className="card-body bg-info">
                        <p className="card-text text-center text-light h1"><i className="bi bi-cup-fill"></i> welcome to c^2 coffee</p>
                    </div>
                    <img className="card-img-bottom" src="https://cargocoffee.co/Media/Thumbs/0012/0012083.jpg" alt="Card image cap"></img>
                </div>
            </div>
            <div className="my-2">
                <h1 className="text-light text-center display-3">e = m c ^ 2</h1>
                <h2 className="text-light text-center">e = experience</h2>
                <h2 className="text-light text-center">m = magical</h2>
                <h2 className="text-light text-center">c = coffee</h2>
            </div>
        </>
    )
}
interface IPictureCardProps {

}
export default PictureCard;
