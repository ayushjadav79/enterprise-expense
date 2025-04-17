import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import axios from 'axios';

const statusColors = {
  PENDING: 'warning',
  APPROVED: 'success',
  REJECTED: 'error',
};

function Approvals() {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetchPendingExpenses();
  }, []);

  const fetchPendingExpenses = async () => {
    try {
      const response = await axios.get('/api/expenses/pending');
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching pending expenses:', error);
    }
  };

  const handleViewExpense = (expense) => {
    setSelectedExpense(expense);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedExpense(null);
    setComment('');
  };

  const handleApprove = async () => {
    try {
      await axios.post(`/api/expenses/${selectedExpense.id}/approve`, { comment });
      fetchPendingExpenses();
      handleCloseDialog();
    } catch (error) {
      console.error('Error approving expense:', error);
    }
  };

  const handleReject = async () => {
    try {
      await axios.post(`/api/expenses/${selectedExpense.id}/reject`, { comment });
      fetchPendingExpenses();
      handleCloseDialog();
    } catch (error) {
      console.error('Error rejecting expense:', error);
    }
  };

  const handleDownloadReceipt = async (expenseId) => {
    try {
      const response = await axios.get(`/api/expenses/${expenseId}/receipt`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `receipt-${expenseId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading receipt:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Pending Approvals
      </Typography>
      <Grid container spacing={3}>
        {expenses.map((expense) => (
          <Grid item xs={12} sm={6} md={4} key={expense.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">
                    ${expense.amount.toFixed(2)}
                  </Typography>
                  <Chip
                    label={expense.status}
                    color={statusColors[expense.status]}
                    size="small"
                  />
                </Box>
                <Typography color="textSecondary" gutterBottom>
                  {expense.category}
                </Typography>
                <Typography variant="body2" paragraph>
                  {expense.description}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Submitted by: {expense.submittedBy}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Tooltip title="View Details">
                    <IconButton
                      onClick={() => handleViewExpense(expense)}
                      size="small"
                    >
                      <ViewIcon />
                    </IconButton>
                  </Tooltip>
                  {expense.receiptUrl && (
                    <Tooltip title="Download Receipt">
                      <IconButton
                        onClick={() => handleDownloadReceipt(expense.id)}
                        size="small"
                      >
                        <DownloadIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Expense Details</DialogTitle>
        <DialogContent>
          {selectedExpense && (
            <>
              <Typography variant="h6" gutterBottom>
                ${selectedExpense.amount.toFixed(2)}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Category: {selectedExpense.category}
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedExpense.description}
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Submitted by: {selectedExpense.submittedBy}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Date: {new Date(selectedExpense.date).toLocaleDateString()}
              </Typography>
              <TextField
                margin="normal"
                fullWidth
                multiline
                rows={4}
                label="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleReject}
            color="error"
            startIcon={<RejectIcon />}
          >
            Reject
          </Button>
          <Button
            onClick={handleApprove}
            color="success"
            startIcon={<ApproveIcon />}
          >
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Approvals; 