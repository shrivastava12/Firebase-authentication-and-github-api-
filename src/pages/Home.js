import React,{useState,useContext} from "react";
import Axios from "axios";
import {
    Row,
    Container,
    Col,
    Input,
    Button,
    InputGroup,
    InputGroupAddon
} from "reactstrap";
import UserCard from "../component/UserCard";
import Repo from "../component/Repos";
import {Redirect} from "react-router-dom";
import {UserContext} from "../context/UserContext";
import {toast} from "react-toastify";

const Home = () => {

    const context = useContext(UserContext)
    const [query,setquery] = useState('')

    const [user,setUser] =  useState('')

    const fetchDetail  =  async() => {
        try{
            const {data} =  await Axios.get(`https://api.github.com/users/${query}`)
            setUser(data)

        }catch(error){
            toast("Not able to locate user",{type:"error"})
        }
    }

if(!context.user?.uid){
    return <Redirect to="/signin"/>

}

    return(
        <Container>
            <Row className="mt-3">
                <Col md ="5">
                    <InputGroup>
                    <Input
                    type="text"
                    value={query}
                    onChange={e => setquery(e.target.value)}
                    placeholder="Please provide the username"
                    />

                    <InputGroupAddon addonType="append">
                        <Button color="primary" onClick={fetchDetail}>
                            Fetch User
                        </Button>
                    </InputGroupAddon>
                    </InputGroup>
                    {user ?<UserCard user={user}/> : null}
                </Col>
                <Col md="7">
                    {user ? <Repo repos_url={user.repos_url}/> : null}
                </Col>
            </Row>
        </Container>
    )
}

export default Home;