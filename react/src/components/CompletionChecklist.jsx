export default function CompletionChecklist({openGapsCount}) {
    return(
        <section>
           <label>
               <input type="checkbox" checked={openGapsCount === 0} disabled/> Evidence gaps resolved
           </label>
            {openGapsCount > 1 ? <p>{openGapsCount} gaps remaining</p> : openGapsCount === 1 ? <p>{openGapsCount} gap remains</p> : ""}
        </section>
    )
}