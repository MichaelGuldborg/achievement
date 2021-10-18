import React from "react";
import {Box, Container, IconButton} from "@material-ui/core";
import SlackFillIcon from "remixicon-react/SlackFillIcon";
import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";
import {Link} from "react-router-dom";
import useScrollPosition from '@react-hook/window-scroll'


const HeaderNav = () => {

    const scrollY = useScrollPosition(60)

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            transition: 'all 0.2s ease',
            boxShadow: scrollY > 0 ? 'rgb(0 0 0 / 10%) 0px 2px 4px' : 'none',
            background: scrollY > 0 ? 'white' : 'transparent'
        }}>
            <Container maxWidth={false}>
                <Box
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: 20,
                        paddingTop: 16,
                        paddingBottom: 16
                    }}
                >
                    <Link to='/nicolai'
                          style={{textDecoration: 'none'}}
                    >
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <div
                                style={{
                                    borderRadius: 10,
                                    marginRight: 2,
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <SlackFillIcon size={32} color='#F57058'/>
                            </div>
                            <span style={{color: 'black', fontWeight: 700}}>Achievo</span>
                        </Box>
                    </Link>
                    <Link to='/nicolai/me'
                          style={{textDecoration: 'none'}}
                    >
                        <Box style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Box
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'end'
                                }}
                            >
                                    <span style={{
                                        fontSize: 12,
                                        fontWeight: 600,
                                        marginRight: 8,
                                        color: 'black'
                                    }}>
                                    NicolaiMTL
                                    </span>
                                <span style={{
                                    fontSize: 12,
                                    marginRight: 8,
                                    color: 'grey'
                                }}>
                                    Rating 1
                                    </span>
                            </Box>
                            <IconButton
                                style={{
                                    background: '#F57058'
                                }}
                            >
                                <div
                                    style={{
                                        height: 10,
                                        width: 10,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <span style={{fontSize: 14, color: 'white'}}>N</span>
                                </div>
                            </IconButton>
                            <div
                                style={{
                                    marginLeft: 8,
                                    background: 'rgba(0,0,0, 0.05)',
                                    height: 20,
                                    width: 20,
                                    borderRadius: 5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <ArrowDownSLineIcon size={14} color='black'/>
                            </div>
                        </Box>
                    </Link>
                </Box>
            </Container>
        </div>
    )
}

export default HeaderNav;