import React from 'react';

const PictureCard = (props: IPictureCardProps) => {
    return (
        <>
            <div>
                <div className="card border border-light rounded mt-2">
                    <div className="card-body bg-light bg-gradient">
                        <p className="card-text text-center h2 border border-3 border-dark rounded m-3 p-3"><i className="bi bi-cup-fill"></i> welcome to c^2 coffee</p>
                    </div>
                    <img className="card-img-bottom border rounded shadow-lg" src="https://cargocoffee.co/Media/Thumbs/0012/0012083.jpg" alt="Card image cap"></img>
                </div>
            </div>
            <div className="my-2">
                <h1 className="text-center display-3">e = m c ^ 2</h1>
                <h2 className="text-center">e = experience</h2>
                <h2 className="text-center">m = magical</h2>
                <h2 className="text-center">c = coffee</h2>
            </div>
        </>
    )
}
interface IPictureCardProps {
    
}
export default PictureCard;
