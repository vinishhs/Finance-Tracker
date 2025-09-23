const express = require('express')
const { createBudget, getBudgets } = require('../controllers/budgetController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

// Create a new budget for the authenticated user
router.post('/', protect, createBudget)

// Get all budgets for the authenticated user
router.get('/', protect, getBudgets)

module.exports = router