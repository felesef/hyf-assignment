import './Card.css';
function Card({ title, description, image , children}) {
    return (
        <div className="card">
            <img src={image} alt={title} />
            <h2>{title}</h2>
            <p>{description}</p>
            <button>View Details</button>
            {children}
        </div>
    );
}

function FavoriteButton() {
    return (
        <button className="favorite-button">Add to Favorites</button>
    );
}
export { FavoriteButton };
export default Card;