import React from "react";
import {Container, Grid} from "@material-ui/core";
import bg from './pexels-julia-volk-6062504.jpg'
import card1 from './pexels-cottonbro-5658531.jpg'
import card2 from './pexels-lukas-296115.jpg'
import Search2LineIcon from "remixicon-react/Search2LineIcon";

import m from './m.jpg'

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
                <Container maxWidth='sm'>
                    <h1 style={{color: 'white', fontSize: 38, marginBottom: 32, textAlign: 'center'}}>
                        Build your life.
                    </h1>

                    <div
                        style={{
                            width: '100%',
                            height: 54,
                            borderRadius: 32,
                            boxShadow: 'rgb(0 0 0 / 10%) 0px 2px 4px',
                            background: 'white',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: '#F57058',
                                width: 40,
                                height: 40,
                                marginLeft: 6,
                                borderRadius: '100%'
                            }}
                        >
                            <Search2LineIcon size={20} color='white'/>
                        </div>
                    </div>
                </Container>

            </div>
            <div style={{paddingTop: 32, paddingBottom: 32}}>
                <Container>
                    <h2 style={{marginTop: 0}}>Explore</h2>
                    <Grid container spacing={2}>
                        <Grid item md={3}>
                            <div style={{
                                boxShadow: 'rgb(0 0 0 / 10%) 0px 2px 4px',
                                borderRadius: 16,
                                overflow: 'hidden'
                            }}>
                                <div
                                    style={{
                                        background: `url(${card1})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        height: 300,
                                        display: 'flex',
                                        alignItems: 'end',
                                        boxShadow: 'inset 0 -200px 200px -200px rgba(0,0,0,1), ' +
                                            'inset 0 -200px 150px -200px rgba(0,0,0,1)'
                                    }}
                                >
                                    <div
                                        style={{
                                            padding: 32,
                                            color: 'white'
                                        }}
                                    >
                                        <h2 style={{margin: 0}}>Lifestyle</h2>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={3}>
                            <div style={{
                                boxShadow: 'rgb(0 0 0 / 10%) 0px 2px 4px',
                                borderRadius: 16,
                                overflow: 'hidden'
                            }}>
                                <div
                                    style={{
                                        background: `url(${card2})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        height: 300,
                                        display: 'flex',
                                        alignItems: 'end',
                                        boxShadow: 'inset 0 -200px 200px -200px rgba(0,0,0,1), ' +
                                            'inset 0 -200px 150px -200px rgba(0,0,0,1)'
                                    }}
                                >
                                    <div
                                        style={{
                                            padding: 32,
                                            color: 'white'
                                        }}
                                    >
                                        <h2 style={{margin: 0}}>Work</h2>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>

                    <div style={{height: 64}}/>
                    <h2 style={{marginTop: 0}}>Top rated users</h2>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <div style={{marginRight: 16,}}>
                            <div style={{
                                background: `url(${m})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: 100,
                                width: 100,
                                borderRadius: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: 'rgb(0 0 0 / 10%) 0px 2px 4px',
                            }}/>
                            <div style={{textAlign: 'center', marginTop: 8}}>MichaelG</div>
                        </div>

                        <div style={{marginRight: 16,}}>
                            <div style={{
                                background: '#F57058',
                                height: 100,
                                width: 100,
                                borderRadius: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: 'rgb(0 0 0 / 10%) 0px 2px 4px',
                            }}/>
                            <div style={{textAlign: 'center', marginTop: 8}}>NicolaiMTL</div>
                        </div>

                    </div>

                    <div style={{height: 64}}/>
                    <div
                        style={{
                            background: '#201C19',
                            height: 350,
                            borderRadius: 16,
                            boxShadow: 'rgb(0 0 0 / 10%) 0px 2px 4px',
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