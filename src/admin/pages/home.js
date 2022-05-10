import './home.css';

export default function Home(props) {
    return (
        <div className="home">
            <h2 className="greeting">Welcome back, {props.user}!</h2>
        </div>
    )
}
