import React, { useContext, useState } from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import image from "./images.jpg";
import axios from 'axios'
import "./cards.css";
import { AuthContext } from "../../context/authContext";
import { useHistory } from "react-router-dom";
import {  Select } from 'antd';
import { Modal, Button, Input } from 'antd';
import {CategoriesPlaces} from "../sidebar/categories-query";
const { Option } = Select;
const { TextArea } = Input;
export default function Card(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const authContext = useContext(AuthContext);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const close = () => {
        setAnchorEl(null);
    };
    const handleShow = () => {
        setShow(true)
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const history = useHistory();
    const deleteCard = (e, idC) => {
        e.preventDefault()


        const headers = {
            'Content-Type': 'Application/json',
            'x-auth-token': localStorage.getItem('token'),
        }

        axios.delete('http://localhost:5000/api/v1/card/card_delete',
            {
                data: { "id": idC },
                headers: {
                    'Content-Type': 'Application/json',
                    'x-auth-token': localStorage.getItem('token'),
                }
            }
        )

            .then((res) => {
                window.location.reload(true);


            }).catch(err => err.message);

    }


    const goToProfile = (e, id) => {
        if (id === authContext.user._id) {
            history.push(`/profileview`)
        }
        else { history.push(`/user/${id}`) }
    }


    return (

        <div className="card" style={{ margin: "20px" }}>
            {authContext.user._id === props.card.user._id ?
                <div className="cards-dots">
                    <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreHorizIcon fontSize="large" style={{ color: "#444" }} />
                    </IconButton>

                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={close}
                        PaperProps={{
                            style: {
                                marginLeft: "1%",
                                marginTop: "4.6%",
                                maxHeight: 48 * 4.5,
                                width: "20ch",
                                display: "flex",
                                flexDirection: "column",
                            },
                        }}
                    >
                        <MenuItem onClick={close}>
                            <div className="UP_Menu_Item">
                                <MenuItem onClick={handleShow}>Edit</MenuItem>
                                <MenuItem onClick={(e) => {
                                    deleteCard(e, props.card._id)
                                }}>Delete</MenuItem>
                            </div>
                        </MenuItem>
                    </Menu>
                </div> : null}
            {show ? <PopupForm handleClose={handleClose}
                card={props.card}

                               show={show}
                               setShow={setShow}
            /> : null}
            <img
                src={"http://localhost:5000" + props.card.picture}
                className="card-img-top"
                alt="..."
            ></img>
            <div className='user-name' onClick={e => goToProfile(e, props.card.user._id)}>
                <div className='content-user'>
                    <img src={"http://localhost:5000" + props.card.user.picture}
                        className='avatar-user'
                    ></img>
                    <span className='name'>{props.card.user.name}</span>
                </div>
            </div>
            <div className="card-body">
                <h5 className="card-title">{props.card.name}</h5>
                <div className="title-region">
                    {/* <h5>{props.category}</h5> */}

                    {props.place ?
                        <span className='text-muted'>{props.card.place}</span> :
                        props.card?.offer?.length > 0 || props.card?.offer != '' ?
                            <span className='text-muted'>{props.card.OfferCategory?.name}</span> : null
                    }
                    <p className="text-muted">
                        <i className="mr bi-geo-alt-fill"></i>
                        {props.card.region}
                    </p>
                </div>
                <h6>Description:</h6>
                {props.card.offer?.length <= 3 ?
                    <p className="card-text">{props.card.description.replace(/^(.{80}[^\s]*).*/, "$1")}</p> :
                    <p className="card-text">{props.card.description.replace(/^(.{50}[^\s]*).*/, "$1")}</p>
                }

                <div className="cat-offer">
                    {props.card.offer?.length > 0 && props.card.place ?
                        props.card.offer?.map(offer =>
                            offer != '' ?
                                <span className='cat'>{offer}</span> : null)
                        : null
                    }
                </div>

            </div>
            <div className='footer-c'>
                <div className="bottom">
                    <a className="links" target="_blank" rel="noopener noreferrer" href={props.card.website}> <i class="mr-2 bi-eye-fill"></i> view website</a>
                </div>
            </div>

        </div>
    );
}

// popup window
const PopupForm = ({ handleClose, SubmitPost,show,setShow,card }) => {
    //New Empty Object To get Post Value

    const [name, setName] = useState(card.name);
    const [region, setRegion] = useState(card.region);
    const [categoriesO, setCategoriesO] = useState(card.CategoriesOffer);
    const [categories, setCategories] = useState([]);
    const [categoriesP, setCategoriesP] = useState(CategoriesPlaces);
    const [description, setDescription] = useState(card.description);
    const [picture, setPicture] = useState();
    const [site, setSite] = useState(card.website);
    const [cardState, setCardState] = useState({});
    React.useEffect(() => {
        axios.get('http://localhost:5000/api/v1/categories/PlaceCategories')
            .then(response => {
                if (response.data.length > 0) {
                    setCardState({...cardState,
                        places: response.data
                    })
                }
            })
        axios.get('http://localhost:5000/api/v1/categories/offerCategories')
            .then(response => {
                if (response.data.length > 0) {
                    setCardState({...cardState,
                        offers: response.data
                    })
                }
            });

    }, []);

   const handlechangeOffer = (event) => {
        // console.log(event)
        // axios.get('http://localhost:5000/api/v1/categories/offerCategories/' + event)
        //     .then(res => {
        //         console.log(res.data.subCategory)
        //         // this.setState({
        //         //     subcategoryOffers: res.data.subCategory,
        //         //     offer: res.data._id
        //         // })
        //
        //     });

    }
   const handlechangecategory = (event) => {

        // axios.get('http://localhost:5000/api/v1/categories/PlaceCategories/' + event)
        //     .then(res => {
        //         console.log(res.data)
        //         this.setState({
        //             subcategoryPlaces: res.data.subCategory,
        //             place: res.data._id
        //         })
        //
        //     });
        // this.setState({
        //     subcategory: true
        // })
    }
   const handleChangenamee = event => {
     setName( event.target.value)

    }
   const handlechangeReg = event => {
       setRegion( event.target.value)
    }
    const handlechangeDesc = event => {

             setDescription(event.target.value)

    }
  const  handlechangeURL = event => {

            setSite(event.target.value)

    }
   const  handleChangepicture = event => {
        console.log(event.target.files[0])

            setPicture(event.target.files[0])

    }
  const  handlechangesub = event => {

      setCategories( event)


    }
  const  handlechangesuboffer = event => {
       setCategoriesP(event)

    }

    const handleSubmit = (e, idCard) => {

        e.preventDefault();
        const cat = [categoriesO, categoriesP];
        console.log(cat)

        const params = new FormData();
        if (categoriesP) { params.append("place", categoriesP); }
        if (categoriesO) {
            for (let cat of categoriesO)
                if (cat != '') {
                    params.append("offer[]", cat);
                }

        }
        params.append("name", name);
        params.append("region", region);
        params.append("description", description);
        if (picture) {
            params.append("picture", picture);
        }
        params.append("website", site);

        const token = localStorage.getItem('token');
        console.log(token)
        for (var value of params.values()) {
            console.log(value);
        }


        axios.patch(`http://localhost:5000/api/v1/card/update/${idCard}`, params, {
            headers: {
                'Content-Type': 'multipart/form-data;',

                'x-auth-token': localStorage.getItem('token')
            }
        })

            .then((res) => {
                console.log(res.data)
                window.location.reload(false);


            }).catch(err => err.message);

    }

    const deleteCategory = (e, index) => {
        e.preventDefault()
        setCategories(categoriesO.splice(index, 1))
        console.log(categoriesO)
    }


    return (
        <>
            <Modal title="Add Card" onCancel={handleClose} visible={show} footer={[
                <Button key="cancel" onClick={handleClose}>
                    Cancel
                </Button>,
                <Button key="schedule" type="submit" onClick={handleSubmit}>Add</Button>
            ]}>
                <Input placeholder="Title" onChange={handleChangenamee} required /><br /><br />
                <Input placeholder="Image" type='file' onChange={(e)=>handleChangepicture(e)} required /><br /><br />
                {cardState? <Select defaultValue="select category" style={{ width: "100%" }} onChange={(e)=> handlechangecategory(e)} required>
                    {cardState?.places?.map((data) => (
                        <Option key={data._id} value={data._id} 	>{data.name}</Option>
                    ))}

                </Select>: null}
               <br /><br />
                {cardState?.places.subCategory ?
                    <div>
                        <Select mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Please select" style={{ width: "100%" }} onChange={handlechangesub} required>
                            {cardState?.places.subcategoryPlaces.map((data) => (
                                <Option key={data._id} value={data._id} 	>{data.name}</Option>
                            ))}
                        </Select>

                        <br /><br />
                    </div>
                    : null
                }
                {
                    cardState?
                    <Select defaultValue="Select Offer" style={{ width: "100%" }} onChange={(e)=>{handlechangeOffer(e)}} required>
                        {cardState?.offers.map((data) => (
                            <Option key={data._id} value={data._id} 	>{data.name}</Option>
                        ))}
                    </Select>:null
                }
               <br /><br />
                {cardState && cardState?.offers.subCategory ?
                    <div>
                        <Select mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Please select" style={{ width: "100%" }} onChange={handlechangesuboffer} required>
                            {cardState && cardState?.offers.map((data) => (
                                <Option key={data._id} value={data._id} >{data.name}</Option>
                            ))}
                        </Select>
                        <br /><br />
                    </div>
                    : null
                }
                <Select defaultValue="Sousse" style={{ width: "100%" }} onChange={handlechangeReg} required>
                    <Option value="Tunis">Tunis</Option>
                    <Option value="Sousse">Sousse</Option>
                    <Option value="Sfax">Sfax</Option>
                    <Option value="Monastir">Monastir</Option>
                </Select><br /><br />
                <Input placeholder="Enter description" onChange={handlechangeDesc} required /><br /><br />
                <TextArea placeholder="Enter Web Site Url" onChange={handlechangeURL} item={card.website} required /><br /><br />
            </Modal>
        </>
    );
}
