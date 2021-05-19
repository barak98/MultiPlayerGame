import './tile.css';

interface Props{
    number: number
    black: string
    white: string
}

export default function tile({number , black, white}: Props){
    switch(number){
    case 1:
        {
            return (
                <div className= "tile">
                    {number}
                    <div id ='imageCenter'><img className= 'checker' src={black}/></div>
                    <div id ='imageCenter'><img className= 'checker' src={black}/></div>
                </div>)
        }

    case 2:{
        return (
            <div className= "tile">
                {number}
            </div>)
    }
    case 4:{
        return (
            <div className= "tile">
                {number}
            </div>)
    }
     case 4:{
        return (
            <div className= "tile">
                {number}
            </div>)
    }
     case 5:{
        return (
            <div className= "tile">
                {number}
            </div>)
    }
     case 6:{
        return (
            <div className= "tile">
                {number}
                <div id ='imageCenter'><img className= 'checker' src={white}/></div>
                <div id ='imageCenter'><img className= 'checker' src={white}/></div>
                <div id ='imageCenter'><img className= 'checker' src={white}/></div>
                <div id ='imageCenter'><img className= 'checker' src={white}/></div>
                <div id ='imageCenter'><img className= 'checker' src={white}/></div>
            </div>)

    }
     case 7:{
        return (
            <div className= "tile" id= 'middleTile'>
                {number}
            </div>)
    }
     case 8:{
        return (
            <div className= "tile" id ='rightTile'>
                {number}
                <div id ='imageCenter'><img className= 'checker' src={white}/></div>
                <div id ='imageCenter'><img className= 'checker' src={white}/></div>
                <div id ='imageCenter'><img className= 'checker' src={white}/></div>
            </div>)
    }
     case 9:{
        return (
            <div className= "tile" id ='rightTile'>
                {number}
            </div>)
    }
     case 10:{
        return (
            <div className= "tile" id ='rightTile'>
                {number}
            </div>)
    } 
    case 11:{
        return (
            <div className= "tile" id ='rightTile'>
                {number}
            </div>)
    } 
    case 12:{
        return (
            <div className= "tile" id ='rightTile'>
                {number}
                <div id ='imageCenter'><img className= 'checker' src={black}/></div>
                <div id ='imageCenter'><img className= 'checker' src={black}/></div>
                <div id ='imageCenter'><img className= 'checker' src={black}/></div>
                <div id ='imageCenter'><img className= 'checker' src={black}/></div>
                <div id ='imageCenter'><img className= 'checker' src={black}/></div>
            </div>)
    } 
    case 13:{
        return (
            <div className= "tile" id ='rightTile'>
                {number}
                <div id ='imageCenter'><img className= 'checker' src={white}/></div>
                <div id ='imageCenter'><img className= 'checker' src={white}/></div>
                <div id ='imageCenter'><img className= 'checker' src={white}/></div>
                <div id ='imageCenter'><img className= 'checker' src={white}/></div>
                <div id ='imageCenter'><img className= 'checker' src={white}/></div>
            </div>)
    } 
    case 14:{
        return (
            <div className= "tile" id ='rightTile'>
                {number}
            </div>)
    } 
    case 15:{
        return (
            <div className= "tile" id ='rightTile'>
                {number}
            </div>)
    } 
    case 16:{
        return (
            <div className= "tile" id ='rightTile'>
                {number}
            </div>)
    } 
    case 17:{
        return (
            <div className= "tile" id ='rightTile'>
                {number}
                <div id ='imageCenter'><img className= 'checker' src={black}/></div>
                <div id ='imageCenter'><img className= 'checker' src={black}/></div>
                <div id ='imageCenter'><img className= 'checker' src={black}/></div>
            </div>)
    } 
    case 18:{
        return (
            <div className= "tile" id= 'middleTile'>
                {number}
            </div>)
    } 
    case 19:{
        return (
            <div className= "tile">
                {number}
                <div id ='imageCenter'><img className= 'checker' src={black}/></div>
                <div id ='imageCenter'><img className= 'checker' src={black}/></div>
                <div id ='imageCenter'><img className= 'checker' src={black}/></div>
                <div id ='imageCenter'><img className= 'checker' src={black}/></div>
                <div id ='imageCenter'><img className= 'checker' src={black}/></div>
            </div>)
    } 
    case 20:{
        return (
            <div className= "tile">
                {number}
            </div>)
    } 
    case 21:{
        return (
            <div className= "tile">
                {number}
            </div>)
    } 
    case 22:{
        return (
            <div className= "tile">
                {number}
            </div>)
    } 
    case 23:{
        return (
            <div className= "tile">
                {number}
            </div>)
    } 
    case 24:{
        return (
            <div className= "tile">
                {number}
                <div id ='imageCenter'><img className= 'checker' src={white}/></div>
                <div id ='imageCenter'><img className= 'checker' src={white}/></div>
            </div>)
    }

    default:{
        return (
            <div className= "tile">
                {number}
            </div>)
    }
    }
    
}