import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import PopoverDatePicker from "../../components/pickers/PopoverDatePicker";
import {toLocalDateMothYearString} from "../../lib/date/toLocalISO";
import {addDays} from "date-fns";
import CheckLineIcon from "remixicon-react/CheckLineIcon";
import {randomId} from "../../lib/math/randomId";


export const Challenge30DayPage = () => {


    const [challenge, setChallenge] = useState({
        id: randomId(),
        name: 'No fap',
        checkIndex: 0,
        start: new Date(),
    })

    const setStartDate = (date: any) => {
        setChallenge((prev) => ({
            ...prev,
            start: date,
        }))
    }

    const setCheckIndex = (index: number) => {
        setChallenge((prev) => ({
            ...prev,
            checkIndex: index,
        }))
    }


    const [showDate, setShowDate] = useState<boolean>(false)


    const isWindowTiny = window.screen.width < 300;
    const isWindowSmall = window.screen.width < 600;
    const [width, height] = isWindowTiny ? [3, 10] : isWindowSmall ? [5, 6] : [10, 3];

    return (
        <div style={{width: '100vw', backgroundColor: 'white', paddingTop: 56}}>
            <Container maxWidth={"md"}>
                <div style={{
                    marginLeft: 16,
                    marginRight: 16,
                    marginTop: 16,
                    marginBottom: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                }}>
                    <Switch
                        checked={showDate}
                        onChange={() => setShowDate(!showDate)}
                    />
                    <PopoverDatePicker value={challenge.start} onChange={(d) => {
                        if (!d) return;
                        setStartDate(new Date(d.getTime()));
                    }}>
                        <Button
                            variant={"outlined"}
                            style={{padding: 8, paddingLeft: 12, paddingRight: 12}}
                            disabled={!showDate}
                        >
                            {toLocalDateMothYearString(challenge.start)}
                        </Button>
                    </PopoverDatePicker>
                </div>


                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingLeft: 16,
                    paddingRight: 16
                }}>
                    {Array.from({length: height}).map((_, i) => {
                        return <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 16}}>
                            {Array.from({length: width}).map((_, j) => {
                                const index = i * width + j;
                                const checked = challenge.checkIndex > index;
                                const indexDate = addDays(challenge.start, index);
                                return <div
                                    style={{
                                        // flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}>

                                    <div
                                        onClick={() => {
                                            const nextIndex = checked ? index : index + 1;
                                            setCheckIndex(nextIndex);
                                        }}
                                        style={{
                                            width: 40,
                                            height: 40,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            // border: checked ? '1px #ccc solid' : '1px #888 solid',
                                            border: '1px solid #D3DAE6',
                                            boxShadow: checked ? '0 0px 0px -1px rgb(152 162 179 / 30%), 0 1px 5px -2px rgb(152 162 179 / 30%)'
                                                : '0 4px 8px 0 rgb(152 162 179 / 15%), 0 2px 2px -1px rgb(152 162 179 / 30%)',
                                            transition: 'all 150ms cubic-bezier(0.694, 0.0482, 0.335, 1)',
                                            marginTop: 4, // allow space for hover animation
                                            transform: checked ? undefined : 'translateY(-2px)',
                                            fontSize: 16,
                                            fontWeight: 500,
                                            borderRadius: 4,
                                            cursor: 'pointer',
                                        }}>
                                        {checked ? <CheckLineIcon
                                            style={{width: 20}}
                                            color={'green'}
                                        /> : <span>{showDate ? `${indexDate.getDate()}` : index + 1}</span>}
                                    </div>
                                </div>
                            })}
                        </div>
                    })}
                </div>
            </Container>
        </div>
    )
}

export default Challenge30DayPage;
