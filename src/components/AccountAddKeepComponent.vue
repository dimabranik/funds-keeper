<template>
  <div>
    <app-nav />

    <h1> add keep account </h1>

    <div class="box text-center"> 
        <h3 class="text-center"> Add income record </h3>
        <br />


            
        <table>
          <tr>
            <td>
              <span> select keep account: </span>
            </td>

            <td>
              <select v-model="selected_keep_account" name="selected_keep_account" >
                  <option v-for="keep_account in keep_accounts" v-bind:key="keep_account.name" > {{ keep_account.name }} </option> 
                  <!--  ( {{ keep_account.curMoney }} )  -->
              </select>
            </td>

          </tr>
            <!-- <br /> -->
            <!-- <br /> -->
          <tr>
            <td>
              <span> money amount to add (in keep account currency): </span>
            </td>

            <td>
              <input v-model="money_amount" type="number" min="1" /> 
              <!-- class="input_number" -->
            </td>

          </tr>
            <!-- <br /> -->

            
            <!-- {{ income }} -->

            <!-- <br /> -->
                <!-- {{ selected_keep_account }} -->

            <!-- v-if="this.selected_keep_account" -->
            <!-- <span > keep account currency: <b style="text-transform: uppercase;"> {{  }} </b> </span> -->
            <!-- <br /> -->
            <!-- <br /> -->

          <tr>
            <td>
              <span> description: </span>
            </td>

            <td>
              <input v-model="description" type="text" /> 
            </td>

          </tr>
        </table>
            <!-- <br /> -->
            <!-- <br /> -->

            <br />

            <input class="input_submit" type="submit" @click="postIncome()" />



    
    </div>


  </div>
</template>

<script>
import AppNav from './AppNav';

export default {
  name: 'account-add-keep-component',
  components: {
    AppNav,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
