'use client'
export default function InteractiveCard ({children ,contentName}: {children : React.ReactNode, contentName:string}) {

    function onCardMouseAction(event: React.SyntheticEvent){
        if(event.type == 'mouseover'){
            event.currentTarget.classList.remove('shadow-lg')
            event.currentTarget.classList.add('shadow-2xl')
            event.currentTarget.classList.remove('bg-white')
            event.currentTarget.classList.add('bg-neutral-200')
        }else{
            event.currentTarget.classList.remove('shadow-2xl')
            event.currentTarget.classList.add('shaodw-lg')
            event.currentTarget.classList.remove('bg-neutral-200')
            event.currentTarget.classList.add('bg-white')
        }
    }

    return (
        <div className="w-[300px] h-[280px] round-lg shoadow-lg bg-white border-[1px] border-gray-500 relative" 
        onMouseOver={(e)=>onCardMouseAction(e)}
        onMouseOut={(e)=>onCardMouseAction(e)}
        style={{borderRadius: "10px"}}
        >
            {children}
        </div>
    );
}