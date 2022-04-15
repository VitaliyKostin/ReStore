import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";
import { AddBasketItemAsync, RemoveBasketItemAsync } from "./basketSlice";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {

    const { basket, status } = useAppSelector(state => state.basket);
    const dispatch = useDispatch();

    if (!basket) return <Typography variant="h3">Your basket is empty</Typography>

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items.map(item => (
                            <TableRow
                                key={item.productId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Box display="flex" alignItems="center">
                                        <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                                        <span>{item.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
                                <TableCell align="center">
                                    <LoadingButton
                                        loading={status === 'pendingRemoveItem' + item.productId + 'rem'}
                                        onClick={() => dispatch(RemoveBasketItemAsync({ productId: item.productId, quantity: 1, name: 'rem' }))}
                                        color="error">
                                        <Remove />
                                    </LoadingButton>
                                    {item.quantity}
                                    <LoadingButton
                                        loading={status === ('pendingAddItem' + item.productId)}
                                        onClick={() => dispatch(AddBasketItemAsync({ productId: item.productId }))}
                                        color="secondary">
                                        <Add />
                                    </LoadingButton>

                                </TableCell>
                                <TableCell align="right">${((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton
                                        loading={status === 'pendingRemoveItem' + item.productId + 'del'}
                                        onClick={() => dispatch(RemoveBasketItemAsync({ productId: item.productId, quantity: item.quantity, name: 'del' }))} color="error">
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Grid container>
                <Grid xs={6} item={true} />
                <Grid xs={6} item={true}>
                    <BasketSummary />
                    <Button
                        component={Link}
                        to="/checkout"
                        variant="contained"
                        size="large"
                        fullWidth
                    >
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </>

    )
}