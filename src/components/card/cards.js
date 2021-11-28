import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Card from './card'
import './cards.css'

import axios from 'axios'
import Loader from '../loader/loader'
import { useParams } from 'react-router-dom'


export default function Cards(props) {

    const [card, setCard] = useState([

    ])

    const [loading, setLoading] = useState(false)





    const [search, setSearch] = useState("")

    let history = useHistory();
    function handleChange(e, id) {

        history.push(`/details/${id}`)

    }

    const [page, setPage] = useState(0);
    const putSearch = (e) => {
        e.preventDefault()
        setPage(page + 1)
        console.log(page)
        window.scrollTo(0, 600)

    }


    const putSearchP = (e) => {
        e.preventDefault()
        setPage(page - 1)
        console.log(page)
        window.scrollTo(0, 600)

    }




    useEffect( () => {

        axios.get("http://localhost:5000/api/v1/card/all?page=" + page, {
            headers: {
                'Content-Type': 'multipart/form-data;',
                'x-auth-token': localStorage.getItem('token')
            }
        })

            .then((res) => {
                setLoading(true)
                //console.log('------------')
                //console.log(res.data)
                /*const data = res.data.sort((c1, c2) => {
                    return c1.user?.followers.length - c2.user?.followers.length
                })*/
                const data = res.data
                setCard(data)


            }).catch(err => console.log(err.message))


    }, [page])






    const [limit, setLimit] = useState(6);
    const items = card.slice(0, limit);



    //console.log(search)
    return (
        <div >
            <div className='items-c'>

                <div className='cards-display'>

                    {
                        loading && card.length > 0 ?
                        card.length > 0 ?
                            card.map((c, index) => {

                                return(

                                            <div>

                                                <Card
                                                    key={index}
                                                    card={c}

                                                /></div>

                                )

                            }) :( <h1>Cards not found</h1>) :
                       ( <div className='cards-display'>
                            <Loader />
                        </div>)


                    }

                </div>


            </div>
            <div className='pagination'>
                {
                    page != 0 ?
                        <button className='btn-pag mr-5' onClick={(e )=> {
                            putSearchP(e)
                        }}><i class="bi bi-chevron-left"></i></button> : null
                }

                {
                    card.length == 20 ?
                        <button className='btn-pag-next' onClick={(e) => {
                            putSearch(e)
                        }}><i class="bi bi-chevron-right"></i></button> : null}
            </div>

        </div>

    )

}