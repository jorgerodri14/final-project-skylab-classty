import React, { useContext, useEffect, useState } from 'react'
import logic from '../../logic'
import Context from '../Context'
import Header from '../Header'
import { withRouter, Link } from 'react-router-dom'

function RemoveClass({ history }) {
    const { classes, setClasses } = useContext(Context)
    const [update, setUpdate] = useState(false)

    function handleSubmit(event){
        event.stopPropagation()
        const {target:{ value: nameClass } }= event
        debugger
        handleRemoveClass(nameClass)
    }
    async function handleRemoveClass(nameClass){
        try{
            await logic.classes.removeClass(nameClass)
            setUpdate(!update)
        }catch(error){
            console.log(error.message)
        }
    }

    
    useEffect(() => {
        (async () => {
            
            const classes = await logic.classes.retrieveClasses();
            setClasses(classes)

        })()
    }, [update])

    return <>
        <Header />
        <div className='remove-class__div'>
        <main className='remove-class'>
        <h2 className='remove-class__h2'>Click to remove class</h2>
            <section>
                <form className='remove-class__form' onChange={handleSubmit}> 
                    {classes && classes.length > 0 && classes.map(({ name }) => {
                            
                            return<div key={name}className='remove-class__div--text'>
                            <label  className='remove-class__label'>{name}</label>
                            <input  className='remove-class__input' type="radio" name="nameClass" value={name}/>
                            </div>

                    })}

                 </form>
            </section>
            <Link className='remove-class__link' to={`/admin`}>Go back</Link >
        </main>
        </div>
    </>
}
export default withRouter(RemoveClass)