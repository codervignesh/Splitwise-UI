<template>
  <div class="right-column">
    <v-row
      v-if="!userId"
      justify="center"
      style="align-items: center; height: calc(100vh - 200px)"
    >
      <img height="350px" style="opacity: 0.7" src="@/assets/expenseimage.png" />
    </v-row>

    <v-row
      v-if="userId"
      style="display: flex; flex-direction: row; justify-content: center; align-items: center; height: 100px;"
    >
      <v-col style="font-size: 24px"><strong>{{ userDetail.userName }}</strong></v-col>
    </v-row>

    <v-row
      v-if="userExpenses.length === 0 && userId"
      justify="center"
      style="align-items: center; height: calc(100vh - 200px)"
    >
      <img height="350px" style="opacity: 0.7" src="@/assets/expenseimage.png" />
    </v-row>

    <div v-if="userExpenses.length > 0 && userId" class="expense-container" style="position: relative">
      <div v-for="(expense, index) in userExpenses" :key="index" style="position: relative; width: 100%;" :class="{'right-row': isUserAvailableInList(expense)}">
        <div style="padding: 20px; width: 350px">
          <v-card class="grp-card" style="box-shadow: 0 1px 3px rgba(0, 0, 0, 0.8)">
            <v-col class="group-card">
              <v-card-title class="group-card-title">{{ expense.note }}</v-card-title>
              <v-card-subtitle class="group-card-subtitle">Category: {{ expense.category }}</v-card-subtitle>
              <!-- <v-card-subtitle class="group-card-head-subtitle">Total: ₹ {{ expense.amount.toFixed(2) }}</v-card-subtitle> -->
            </v-col>
            <!-- <v-col style="width: 100%; display: flex; padding-bottom: 0px">
              <v-card-subtitle class="group-card-subtitle">Category: {{ expense.category }}</v-card-subtitle>
            </v-col> -->
            <!-- <v-col style="width: 100%; display: flex; padding-bottom: 0px">
              <v-card-subtitle class="group-card-subtitle">Created By: {{ getUserById(expense.createdBy) }}</v-card-subtitle>
            </v-col> -->

            <v-card-actions v-if="isUserAvailableInList(expense)" style="justify-content: space-between; width: 100%">
              <v-card-subtitle class="group-card-head-subtitle-total">Total: ₹ {{ expense.amount.toFixed(2) }}</v-card-subtitle>
              <v-btn @click="payExpense(expense.expenseId)" :disabled="hasUserPaid(expense)" :color="hasUserPaid(expense) ? 'black' : 'primary'">
                <v-icon color="success" v-if="hasUserPaid(expense, index)">mdi-check</v-icon>
                {{ hasUserPaid(expense) ? "Paid" : "Pay" }}
              </v-btn>
            </v-card-actions>

            <v-card-actions v-if="!isUserAvailableInList(expense)" style="justify-content: space-between; width: 100%" :color="hasUserPaid(expense) ? 'green' : 'primary'">
              <v-card-subtitle class="group-card-head-subtitle-total">Total: ₹ {{ expense.amount.toFixed(2) }}</v-card-subtitle>
              <p v-if="!hasUserPaid(expense) && !isUserAvailableInList(expense)" style="color: red">*Pending*</p>
              <p v-if="hasUserPaid(expense) && !isUserAvailableInList(expense)" style="color: green">*Received*</p>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/user-page.js"></script>

<style scoped>
.right-column {
  width: 70%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
}

@media (max-width: 1250px) {
  .right-column {
    width: 100%;
  }
}

.expense-container {
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 200px);
  overflow-y: auto;
}

@media (max-width: 600px) {
  .expense-container {
    margin-top: 100px;
  }
}

.grp-card {
  border-radius: 0 25px;
}

.group-card {
  background-color: #5c8374;
  /* margin-bottom: 10px; */
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}

.group-card-title {
  width: 92%;
  display: flex;
  justify-content: start;
  /* height: 50px; */
}

.group-card-head-subtitle {
  display: flex;
  justify-content: end;
  align-items: center;
}

.group-card-head-subtitle-total {
  display: flex;
  justify-content: end;
  align-items: start;
}

.group-card-subtitle {
  display: flex;
  justify-content: start;
}

.right-row {
  display: flex;
  flex-direction: column;
  align-items: end;
}
</style>
