import React from "react";
import {Container} from "@material-ui/core";
import bg from './pexels-julia-volk-6062504.jpg'
import Search2LineIcon from "remixicon-react/Search2LineIcon";

const ExplorePage = () => {

    return (
        <div>
            <div
                style={{
                    height: 500,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: `url(${bg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'bottom',
                    position: 'relative'
                }}
            >
                <div>
                    <h1 style={{fontSize: 32, textAlign: 'center'}}>
                        Start building your life
                    </h1>

                    <div
                        style={{
                            width: 700,
                            height: 54,
                            borderRadius: 32,
                            boxShadow: 'rgb(0 0 0 / 10%) 0px 4px 12px',
                            background: 'white',
                            marginTop: 16,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <div style={{paddingLeft: 16, marginTop: 2}}>
                            <Search2LineIcon color='#F57058'/>
                        </div>
                    </div>
                </div>

            </div>
            <div style={{paddingTop: 32, paddingBottom: 32}}>
                <Container>
                    <h1>Explore plans</h1>
                    <div
                        style={{
                            background: 'red',
                            height: 250

                        }}
                    >

                    </div>

                    <h1>Top rated users</h1>
                    <div
                        style={{
                            background: 'red',
                            height: 100

                        }}
                    >
                    </div>

                    <div style={{height: 32}}/>
                    <div
                        style={{
                            background: '#201C19',
                            height: 350,
                            borderRadius: 16,
                            boxShadow: 'rgb(0 0 0 / 10%) 0px 4px 12px',
                        }}
                    >
                        <div
                            style={{
                                padding: 32,
                                color: 'white'
                            }}
                        >
                            <h1 style={{margin: 0}}>Start planning</h1>
                        </div>

                    </div>

                </Container>
            </div>
        </div>
    )
}

export default ExplorePage;