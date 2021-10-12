import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
import {colors} from "@material-ui/core";
import React from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

const styles = {
    number: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        fontSize: 48,
        textAlign: 'center',
        marginBottom: 12,
    },
    text: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 14,
        color: colors.grey["700"],
    }
} as any


export const SocialCostBenefitRatio = () => {
    return (
        <Paper style={{height: '100%', minHeight: 200, display: 'flex', flexDirection: 'column'}}>
            <Box ml={2} mr={2}>
                <h3>Social Cost Benefit Ratio</h3>
            </Box>
            <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row',
            }}>
                <div style={{
                    flex: 5,
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}>
                    <div style={styles.number}>
                        1
                    </div>
                    <div style={styles.text}>
                        DKK investeret
                    </div>
                </div>

                <div style={{
                    flex: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    marginTop: -32
                }}>
                    <img src={'https://i.pinimg.com/originals/65/f0/5b/65f05b5e520c1a52610aaf56052c1ba8.png'}
                         width={120} height={60}/>
                    <ArrowRightLineIcon size={40}/>
                </div>


                <div style={{
                    flex: 5,
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}>
                    <div style={styles.number}>
                        9,3
                    </div>
                    <div style={styles.text}>
                        DKK samfundsafkast
                    </div>
                </div>


            </div>

        </Paper>

    )
}


export default SocialCostBenefitRatio;