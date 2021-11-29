import React, { useEffect, useState } from "react";
import "./ProfileView.css";
import InfiniteScroll from 'react-infinite-scroll-component';

import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
export default function Acceuil() {
    const authContext = useContext(AuthContext);
    const [total, setTotal] = useState(null)
    const limit = 3;
    const [page, setPage] = useState(0)

    const [data, setData] = useState([])
    const fetchPosts = async () => {
        axios
            .get(`http://localhost:5000/api/v1/post?limit=${limit}&page=${page}`, {
                headers: {

                    "x-auth-token": localStorage.getItem("token")
                }
            })

            .then((res) => {
                if (page == 0) {
                    setTotal(res.data.total)
                    setData(res.data.posts)
                }
                else {
                    // let previousData = card
                    setData([...data, ...res.data.posts])
                }
                setPage(page + 1)


            })
            .catch((err) => err.message)


    }
    useEffect(async () => {
        fetchPosts()

    }, []);

    //New Empty Object To get Post Value
    const [text, setText] = useState("");
    const [link, setLink] = useState();

    const handleSubmit = (e) => {

        e.preventDefault();
        //console.log(name, region, description, categoriesP, categoriesO, picture)
        const params = new FormData();

        params.append("text", text);
        if (link)
        {
            params.append("link", link );
        }


        const token = localStorage.getItem('token');
        console.log(token)
        for (var value of params.values()) {
            console.log(value);
        }


        axios.post('http://localhost:5000/api/v1/post',params, {
            headers:{
                'Content-Type': 'multipart/form-data',

                'x-auth-token': localStorage.getItem('token')
            }
        })

            .then((res)=> {
                console.log('response posting article',res.data)
                window.location.reload(false);
            } ).catch(err => err.message);

    }

    const formatDate = (date) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let today = new Date(date);
        return `${today.getDate()} ${monthNames[today.getMonth()]} , ${today.getHours()} : ${today.getMinutes()}`;
    }



    return (
        <div className="theme-layout">



            <section>

                <div className="gap gray-bg">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row" id="page-contents">
                                    <div className="col-lg-2">
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="central-meta">
                                            <div className="new-postbox">
                                                <figure>
                                                    {/* Profile Image */}
                                                    <img className='avatar' src={'http://localhost:5000' + authContext.user.picture} alt="profile_img" />
                                                </figure>
                                                <div className="newpst-input">
                                                    <form method="post">
                                                        <textarea rows="2" placeholder="write something" onChange={(e)=>setText( e.target.value) }></textarea>
                                                        <div className="attachments">
                                                            <ul>
                                                                <li>
                                                                    <i className="fa fa-image"></i>
                                                                    <label className="fileContainer">
                                                                        <input type="file" onChange={(e)=>setLink( e.target.files[0]) }/>
                                                                    </label>
                                                                </li>
                                                                <li>
                                                                    <button type="submit" onClick={(e)=>handleSubmit(e)}>Post</button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="loadMore">
                                            <InfiniteScroll
                                                dataLength={total}
                                                next={fetchPosts}
                                                hasMore={!(page == Math.ceil(total / limit))}

                                            >
                                                {data.map((d) => (
                                                    <div key={d._id} className="central-meta item">
                                                        <div className="user-post">
                                                            <div className="friend-info">
                                                                <figure>
                                                                    <img className='avatar' src={'http://localhost:5000' + d.user_id.picture} alt="avatar" />
                                                                </figure>
                                                                <div className="friend-name">
                                                                    <ins><Link to={`/user/${d.user_id._id}`} title="">{d.user_id.name}</Link></ins>
                                                                    <span>{ formatDate(d.Date_creation)}</span>
                                                                </div>
                                                                <div className="post-meta">
                                                                    <div >

                                                                        <p>
                                                                            {d.text}

                                                                        </p>
                                                                        <iframe src={"http://localhost:5000" + d.link} height="500" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto'}} webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

                                                                    </div>
                                                                    {/*
                                                                                                                                        <div className="we-video-info">
                                                                        <ul>
                                                                            <li>
                                                                                <span className="comment" data-toggle="tooltip" title="Comments">

                                                                                </span>
                                                                            </li>
                                                                            <li>
                                                                                <span className="comment" data-toggle="tooltip" title="Comments">

                                                                                </span>
                                                                            </li>
                                                                            <li>
                                                                                <span className="like" data-toggle="tooltip" title="like">
                                                                                    <i class="fa fa-heart"></i>
                                                                                    <ins>2.2k</ins>
                                                                                </span>
                                                                            </li>
                                                                            <li>
                                                                                <span className="comment" data-toggle="tooltip" title="Comments">
                                                                                    <i className="fa fa-comments-o"></i>
                                                                                    <ins>52</ins>
                                                                                </span>
                                                                            </li>


                                                                        </ul>
                                                                    </div>

                                                                    */}
                                                                </div>
                                                            </div>
                                                            {/* comment area (should't rely on jquery) */}
                                                            {/* <div className="coment-area">
                                                                <ul className="we-comet">
                                                                    <li>
                                                                        <div className="comet-avatar">
                                                                            <img className='avatar' src={'http://localhost:5000' + authContext.user.picture} alt="profile_img" />

                                                                        </div>
                                                                        <div className="we-comment">
                                                                            <div className="coment-head">
                                                                                <h5><Link to={`#`}>Marwa</Link></h5>
                                                                                <span>1 year ago</span>
                                                                            </div>
                                                                            <p>we are working for the dance and sing songs. this car is very awesome for the youngster. please vote this car and like our post</p>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="comet-avatar">
                                                                            <img className='avatar' src="images/avatar.jpg" alt="" />
                                                                        </div>
                                                                        <div className="we-comment">
                                                                            <div className="coment-head">
                                                                                <h5><a href="time-line.html" title="">Safa</a></h5>
                                                                                <span>1 week ago</span>
                                                                            </div>
                                                                            <p>we are working for the dance and sing songs. this video is very awesome for the youngster. please vote this video and like our channel
                                                                    <i className="em em-smiley"></i>
                                                                            </p>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#" title="" className="showmore underline">more comments</a>
                                                                    </li>
                                                                    <li className="post-comment">
                                                                        <div className="comet-avatar">
                                                                            <img className='avatar2' src={'http://localhost:5000' + authContext.user.picture} alt="profile_img" />

                                                                        </div>
                                                                        <div className="post-comt-box">
                                                                            <form method="post">
                                                                                <textarea placeholder="Post your comment"></textarea>
                                                                                <button type="submit" style={{ color: 'white', backgroundColor: '#088dcd' }}>Comment</button>
                                                                            </form>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div> */}
                                                        </div>
                                                    </div>

                                                ))}
                                            </InfiniteScroll>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}