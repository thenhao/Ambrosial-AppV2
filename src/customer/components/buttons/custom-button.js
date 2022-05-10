import './custom-button.css';

function Custombutton(props){

    return(
        <>
            <button className="custom-button" onClick={props.click}>{props.sign}</button>
        </>
    )
}

export default Custombutton;