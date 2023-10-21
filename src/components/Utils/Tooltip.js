import '../../styles/Tooltip.css';

function Tooltip({children, text}){
    return (
        <>
            <div className='tooltip'>
                {children}
                <span className="tooltiptext">{text}</span>
            </div>
        </>
    )
}

export default Tooltip;