import React from 'react';
import {Box, Button} from "@material-ui/core";
import FullCenterPage from "../../components/containers/FullCenterPage";

const NotFoundPage: React.FC = () => {
    const onBackClick = () => {
        // history.push(Routes.home)
    };
    return (
        <Box style={{
            width: '100%',
            height: '100%',
            backgroundRepeat: 'no-repeat',
            background: "linear-gradient(45deg, rgba(148,45,196,1) 0%, rgba(8,126,225,1) 100%)",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <FullCenterPage>
                <Box>
                    <h2 style={{color: 'white'}}>404. Siden findes ikke</h2>
                    <p style={{color: 'white'}}>Vi kunne desværre ikke finde den side, du ledte efter.</p>
                    <Button style={{color: 'white'}} onClick={onBackClick}>
                        Tilbage
                    </Button>
                </Box>
            </FullCenterPage>
        </Box>
    );
};

export default NotFoundPage;
