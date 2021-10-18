import React, {ChangeEvent} from "react";
import {Box, Container, Divider, IconButton, Tab, Tabs} from "@material-ui/core";
import SlackFillIcon from "remixicon-react/SlackFillIcon";
import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";
import BarChartBoxLineIcon from "remixicon-react/BarChartBoxLineIcon";
import Database2LineIcon from "remixicon-react/Database2LineIcon";
import OrganizationChartIcon from "remixicon-react/OrganizationChartIcon";
import {Link} from "react-router-dom";


const HeaderNav = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    // SHIT MOCKUP CODE
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100
        }}>
            <Container maxWidth={false}>
                <Box
                    style={{
                        paddingTop: 16,
                        paddingBottom: 16,
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative'
                    }}
                >
                    <Container maxWidth={false}>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                fontSize: 20
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
                                    <span style={{color: 'black', fontWeight: 700}}>
                                    Achievo
                                </span>
                                </Box>
                            </Link>
                            <Link to='/nicolai/me'
                                  style={{textDecoration: 'none'}}
                            >
                                <Box style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <IconButton
                                        style={{
                                            background: '#F57058'
                                        }}
                                    >
                                        <div
                                            style={{
                                                height: 8,
                                                width: 8,
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
                                            marginLeft: 4,
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
                                        <ArrowDownSLineIcon size={16} color='black'/>
                                    </div>
                                </Box>
                            </Link>
                        </Box>
                    </Container>
                </Box>
            </Container>
        </div>
    )
}

export default HeaderNav;