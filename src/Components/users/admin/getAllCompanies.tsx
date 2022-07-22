import { Box, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, DialogTitle } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { Company } from '../../../model/company';
import { deleteCompany, downloadCompanies } from "../../../redux/companyState";
import { deleteCoupon } from '../../../redux/guestState';
import { store } from '../../../redux/store';
import globals from "../../../utils/globals";
import { jwtAxios } from '../../../utils/jwtAxios';
import notify from '../../../utils/notify';


function GetAllCompanies(): JSX.Element {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState<Company[]>(store.getState().companyState.companies);

    useEffect(() => {
        if (companies.length === 0) {
            jwtAxios.get<Company[]>(globals.urls.adminAllCompanies)
                .then(response => {
                    setCompanies(response.data);
                    store.dispatch(downloadCompanies(response.data));
                })
                .catch(err => {
                    notify.error(err.data.response.description)
                })
        }
    }, [])

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <Button onClick={() => { navigate("/admin/addCompany") }}> + Add Company </Button>
            </Box> <br />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#bdbdbd" }}  >
                            <TableCell ><b>#</b></TableCell>
                            <TableCell><b>Name</b></TableCell>
                            <TableCell><b>Email</b></TableCell>
                            <TableCell></TableCell>
                            <TableCell><b>Action</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies.map((item) => (
                            <CompanyRow key={item.id} row={item} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );

    function CompanyRow(props: { row: Company }) {
        const company = props.row;
        const navigate = useNavigate();
        const [dialog, setDialog] = useState(false)
        const [open, setOpen] = useState(false);

        const handleDelete = (companyToDelete: Company) => {
            jwtAxios.delete(globals.urls.deleteCompany + companyToDelete.id)
                .then(() => {
                    store.dispatch(deleteCompany(companyToDelete.id))
                    setCompanies(store.getState().companyState.companies)
                    companyToDelete.coupons.map(item => {
                        store.dispatch(deleteCoupon(item.id))
                    })
                })
                .catch(err => { notify.error(err.response.data.description) })
            setDialog(false)
        }

        return (
            <>
                <TableRow>
                    <TableCell>
                        {company.id}
                    </TableCell>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company.email}</TableCell>
                    <TableCell>
                        <Button variant="primary" onClick={() => setOpen(!open)}>Coupons</Button>
                    </TableCell>
                    <TableCell>
                        <IconButton aria-label="update" onClick={() => navigate("/admin/updateCompany", { state: { company: company } })}>
                            <ModeIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={() => setDialog(true)}>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                    <Dialog
                        open={dialog}>
                        <DialogTitle>
                            Delete Company
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                You are about to delete this company. Are you sure?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleDelete(company)}> Yes</Button>
                            <Button onClick={() => setDialog(false)}> No</Button>
                        </DialogActions>
                    </Dialog>
                </TableRow>

                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Coupons
                                </Typography>
                                <Table size="small">
                                    <TableHead className="tableH">
                                        <TableRow>
                                            <TableCell>Id</TableCell>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Description</TableCell>
                                            <TableCell>Category</TableCell>
                                            <TableCell>StartDate</TableCell>
                                            <TableCell>EndDate</TableCell>
                                            <TableCell>Amount</TableCell>
                                            <TableCell>Price</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {company.coupons.map((couponsRow) => (
                                            <TableRow key={couponsRow.id}>
                                                <TableCell component="th" scope="row">
                                                    {couponsRow.id}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {couponsRow.title}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {couponsRow.description}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {couponsRow.category}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {couponsRow.startDate}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {couponsRow.endDate}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {couponsRow.amount}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {couponsRow.price}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>
        );
    }
}

export default GetAllCompanies;