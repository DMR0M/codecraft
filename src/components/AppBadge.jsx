import { Badge, CloseButton } from 'react-bootstrap';


const AppBadge = ({ bgColor, txtColor, text, hasCloseBtn, btnClickHander }) => {
    return (
        <>
        {
            hasCloseBtn ? 
            <Badge bg={bgColor} text={txtColor} className="text-center">
                <CloseButton
                    className="m-1"
                    aria-label="Close"
                    onClick={() => btnClickHander(text)}
                />
                {text}
            </Badge> : 
            <Badge bg={bgColor} text={txtColor} className="text-center">
                {text}
            </Badge>
        }
        </>
    )
}


export default AppBadge;
