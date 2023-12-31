import { useAppStore } from "../../store/splitwise-store";
import { mapState, mapActions } from "pinia";

export default {
  data() {
    return {
      note: "",
      totalAmount: null,
      selectedCurrency: null,
      // currencies: ["USD", "EURO", "INR"],
      selectedCategory: null,
      // categories: ["Food", "Transportation", "Accommodation", "Others"],
      //   users: ["Vignesh", "Bala", "Sangavi"],
      selectedUsers: [],
      splitPercentages: Array(3).fill(""),
      selectedUserId: null,
    };
  },
  computed: {
    isValidForm() {
      if(this.$route.params.group_id){
        const isTotalAmountValid =
          !isNaN(this.totalAmount) && parseFloat(this.totalAmount) > 0;
        const isNote = !!this.note;
        const isCurrencySelected = !!this.selectedCurrency;
        const isCategorySelected = !!this.selectedCategory;
        const isAtLeastOneUserSelected = this.selectedUsers.some((user) => user);
        const isSumOfSplitPercentagesValid =
          this.calculateSumOfEnabledSplitPercentages() === 100;

        return (
          isTotalAmountValid &&
          isNote &&
          isCurrencySelected &&
          isCategorySelected &&
          isAtLeastOneUserSelected &&
          isSumOfSplitPercentagesValid
        );
      }
      else{
        const isTotalAmountValid =
        !isNaN(this.totalAmount) && parseFloat(this.totalAmount) > 0;
        const isNote = !!this.note;
        const isCurrencySelected = !!this.selectedCurrency;
        const isCategorySelected = !!this.selectedCategory;
        const isSelectedUserId = this.selectedUserId != null;

        return (
          isTotalAmountValid &&
          isNote &&
          isCurrencySelected &&
          isCategorySelected &&
          isSelectedUserId 
        );
      }
    },
    canSplitEqually() {
      return this.selectedUsers.some((user) => user);
    },
    ...mapState(useAppStore, ["users", "currencies", "categories"]),
  },
  methods: {
    shouldDisableSplitPercentage(index) {
      const isDisabled =
        !this.selectedUsers[index] ||
        (index === this.users.length - 1 && !this.selectedUsers[index]);

      if (isDisabled) {
        this.splitPercentages[index] = "";
      }

      return isDisabled;
    },
    calculateSumOfEnabledSplitPercentages() {
      return this.splitPercentages.reduce((sum, percentage, index) => {
        if (this.selectedUsers[index] && percentage !== "") {
          return sum + parseFloat(percentage);
        }
        return sum;
      }, 0);
    },
    handleTotalAmountInput() {
      this.totalAmount = Math.abs(parseFloat(this.totalAmount)).toString();
    },
    handleSplitPercentageInput(index) {
      this.splitPercentages[index] = Math.abs(
        parseFloat(this.splitPercentages[index])
      ).toString();
    },
    createExpense() {
      if(this.$route.params.group_id)
        this.groupExpense()
      else
        this.userExpense()
    },
    groupExpense() {
      if (this.isValidForm) {
        const userList = this.selectedUsers.reduce((acc, selected, index) => {
          if (selected && this.splitPercentages[index] !== "") {
            const userId = this.users[index].userId;
            const payed =
              userId === parseInt(localStorage.getItem("userId"), 10);
            acc.push({
              userId: userId,
              splitPercentage: parseFloat(this.splitPercentages[index]),
              payed: payed,
              splitAmount: null,
            });
          }
          return acc;
        }, []);

        const expenseRequest = {
          groupId: this.$route.params.group_id,
          note: this.note,
          category: this.selectedCategory,
          createdBy: localStorage.getItem("userId"),
          totalAmount: this.totalAmount,
          currencyType: this.selectedCurrency,
          userList: userList,
        };

        const actions = {
          payload: expenseRequest,
          success: this.onSuccessGroup,
        };

        this.ADD_EXPENSE(actions);
      }
    },
    userExpense(){
        const expenseRequest = {
          note: this.note,
          category: this.selectedCategory,
          currencyType: this.selectedCurrency,
          createdBy: localStorage.getItem("userId"),
          amount: this.totalAmount,
          receiverUser: this.selectedUserId,
        };

        const actions = {
          payload: expenseRequest,
          success: this.onSuccessUser,
        };

        this.ADD_EXPENSE_USER(actions);
    },
    onSuccessGroup() {
      this.resetForm();
      this.$router.push("/group/" + this.$route.params.group_id);
    },
    onSuccessUser() {
      this.resetForm();
      this.$router.push("/user/" + this.selectedUserId);
    },
    resetForm() {
      this.note = "";
    },
    splitEqually() {
      const numberOfSelectedUsers = this.selectedUsers.filter(
        (user) => user
      ).length;
      const equalPercentage =
        numberOfSelectedUsers === 0 ? 0 : 100 / numberOfSelectedUsers;

      this.splitPercentages = this.selectedUsers.map((user, index) => {
        return user ? equalPercentage.toFixed(2) : "";
      });
    },
    ...mapActions(useAppStore, ["ADD_EXPENSE", "GET_GROUP_MEMBERS", "GET_CATEGORY_LIST", "ADD_EXPENSE_USER"]),
  },
  created() {
    if(this.$route.params.group_id)
      this.GET_GROUP_MEMBERS(this.$route.params.group_id);
    this.GET_CATEGORY_LIST()
  },
};
