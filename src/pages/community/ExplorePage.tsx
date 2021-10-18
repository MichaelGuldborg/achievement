import React from "react";
import {Container} from "@material-ui/core";
import bg from './pexels-julia-volk-6062504.jpg'
import Search2LineIcon from "remixicon-react/Search2LineIcon";

const ExplorePage = () => {

    return (
        <div>
            <div
                style={{
                    height: 450,
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
                <Container maxWidth='sm'>
                    <h1 style={{fontSize: 32, textAlign: 'center'}}>
                        Start building your life
                    </h1>

                    <div
                        style={{
                            width: '100%',
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
                </Container>

            </div>
            <div style={{paddingTop: 32, paddingBottom: 32}}>
                <Container>
                    <h2>Explore</h2>
                    <div
                        style={{
                            height: 250
                        }}
                    >

                    </div>

                    <h2>Top rated users</h2>
                    <div
                        style={{
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
                            boxShadow: 'rgb(0 0 0 / 10%) 0px 4px 12px'
                        }}
                    >
                        <div
                            style={{
                                padding: 32,
                                color: 'white'
                            }}
                        >
                            <h2 style={{margin: 0}}>Start building</h2>
                        </div>

                    </div>

                </Container>
            </div>
        </div>
    )
}

export default ExplorePage;