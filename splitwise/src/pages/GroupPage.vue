<template>
  <div class="right-column">
    <v-row
      v-if="!groupId"
      justify="center"
      style="align-items: center; height: calc(100vh - 200px)"
    >
      <!-- <h3>Select a group to view its expenses</h3> -->
      <img height="350px" style="opacity: 0.5;" src="@/assets/expenseimage.png"/>
    </v-row>

    <v-row
      v-if="groupId"
      style="
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 100px;
      "
    >
    <v-col cols="12" sm="6" md="4" style="margin-top: 20px">
        <v-select
          v-model="selectedCategory"
          :items="filterCategory"
          label="Select a category"
          @change="searchByCategory"
        ></v-select>
      </v-col>
      <!-- <v-col cols="12" sm="6" md="4" style="margin-top: 20px">
        <v-text-field
          style=" color:black height: 50px;"
          v-model="search"
          label="Search"
          @keyup.enter="searchByCategory"
        ></v-text-field>
      </v-col> -->
      <v-col style="font-size: 24px; text-transform: capitalize;" 
        ><strong>{{ groupDetail.groupName }}</strong></v-col
      >
      <v-col>
        <v-icon @click="showGroupInfo">mdi-information</v-icon>
        <GroupInfo
          v-if="showInfo"
          :groupDetail="groupDetails"
          @closeGroupInfo="closeGroupInfo"
        />
      </v-col>
      <v-col>
        <v-btn @click="createExpense" style="text-transform: capitalize; font-size: 16px;">Create Expense</v-btn>
      </v-col>
    </v-row>

    <v-row
      v-if="expenses.length == 0 && groupId"
      justify="center"
      style="align-items: center; height: calc(100vh - 200px)"
    >
    <!-- <img src="@/assets/notfound.gif"/> -->
      <!-- <h3>Initiate a fresh start by creating a new expense</h3> -->
      <img height="350px" style="opacity: 0.5;" src="@/assets/expenseimage.png"/>
    </v-row>
    <v-row
      v-if="expenses.length > 0 && groupId"
      class="expense-container"
    >
      <v-col
        v-for="(expense, index) in expenses"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <v-card
          class="grp-card"
          style="box-shadow: 0 1px 3px rgba(0, 0, 0, 0.8)"
        >
          <v-col class="group-card">
            <v-card-title class="group-card-title">{{
              expense.note
            }}</v-card-title>
            <v-card-subtitle class="group-card-head-subtitle"
              >Total: ₹ {{ expense.totalAmount.toFixed(2) }}</v-card-subtitle
            >
          </v-col>
          <v-col style="width: 100%; display: flex; padding-bottom: 0px">
            <v-card-subtitle class="group-card-subtitle"
              >Category: {{ expense.category }}
            </v-card-subtitle>
          </v-col>
          <v-col style="width: 100%; display: flex; padding-bottom: 0px">
            <v-card-subtitle class="group-card-subtitle">
              Created By: {{ getUserById(expense.createdBy) }}</v-card-subtitle
            >
          </v-col>

          <v-list style="height: 130px">
            <v-list-item
              v-for="(user, userIndex) in expense.userList"
              :key="userIndex"
            >
              <v-list-item-content
                style="display: flex; width: 100%; padding: 0px 10px"
              >
                <v-list-item-title
                  style="display: flex; justify-content: start; width: 50%"
                >
                  {{ getUserById(user.userId) }}
                </v-list-item-title>
                <v-list-item-title
                  style="display: flex; justify-content: end; width: 50%"
                >
                  ₹ {{ user.splitAmount.toFixed(2) }}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle
                  v-if="user.payed"
                  class="paid-badge badge"
                >
                  Paid
                </v-list-item-subtitle>
                <v-list-item-subtitle
                  v-else
                  class="unpaid-badge badge"
                >
                  Not Paid
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-card-subtitle style="display: flex; justify-content: end">
            {{ expense.userList.filter((user) => user.payed).length }}/{{
              expense.userList.length
            }}
            Users Paid
          </v-card-subtitle>

          <v-card-actions
            v-if="isUserAvailableInList(expense)"
            style="justify-content: end; width: 100%"
          >
            <v-btn
              @click="payExpense(expense.expenseId)"
              :disabled="hasUserPaid(expense)"
              :color="hasUserPaid(expense) ? 'green' : 'primary'"
            >
              <v-icon color="success" v-if="hasUserPaid(expense, index)"
                >mdi-check</v-icon
              >
              {{ hasUserPaid(expense) ? "Paid" : "Pay" }}
            </v-btn>
          </v-card-actions>
          <v-card-actions
            v-if="!isUserAvailableInList(expense)"
            style="justify-content: center; width: 100%"
          >
            <p>*No payment required*</p>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script src="./js/group-page.js"></script>

<style scoped>
.right-column {
  width: 70%;
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
}

@media (max-width: 1250px) {
  .right-column {
    width: 100%;
  }
}

.v-row {
  flex: none;
}

.grp-card {
  border-radius: 0px 25px;
}
.group-card {
  background-color: #5c8374;
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}
.group-card-title {
  width: 92%;
  display: flex;
  justify-content: start;
  height: 50px;
}

.group-card-head-subtitle {
  display: flex;
  justify-content: end;
  align-items: center;
}

.group-card-subtitle {
  display: flex;
  justify-content: start;
}

.expense-container {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 200px);
  overflow-y: auto;
}

@media (max-width: 700px) {
  .expense-container {
    margin-top: 150px;
  }
}

.badge {
  margin: 0px 10px;
  border-radius: 10px;
  font-size: 10px;
  display: inline;
  color: #fff;
  padding: 5px;
}

.paid-badge {
  background-color: green;
}

.unpaid-badge {
  background-color: #ff3333;
}

</style>

