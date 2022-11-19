<script lang="ts">
  import { backend } from "$lib/store/backend";
  import { PasswordInput, TextInput } from "carbon-components-svelte";
  import PasswordCreateUser from "./PasswordCreateUser.svelte";
  import PasswordForgot from "./PasswordForgot.svelte";

  let email = "";
  let password = "";
  let loading = false;
  let createNewUser = false;
  let forgotPassword = false;

  $: emailCheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
  $: disabled = !email.length || password.length < 8 || !emailCheck || loading;

  async function login() {
    try {
      loading = true;
      await $backend.collection("users").authViaEmail(email, password);
    } catch (error) {
    } finally {
      loading = false;
    }
  }
</script>

<div class="password-login">
  <TextInput bind:value={email} labelText="Your email" placeholder="Enter your email..." />
  <div style="margin-top: 1.25em;" />
  <div class="password-wrap">
    <PasswordInput
      tooltipAlignment="start"
      tooltipPosition="left"
      labelText="Password"
      placeholder="Enter password..."
      bind:value={password}
      minlength={8}
      maxlength={100}
    />
    <div class="forgot-password" on:click={() => (forgotPassword = true)}>forgot password?</div>
  </div>
  <div style="margin-top: 1.25em;" />
  <button {disabled} on:click={login}> Log in </button>
  <div class="sign-up">
    don't have an account? <span on:click={() => (createNewUser = true)}>sign up</span>
  </div>
</div>

{#if createNewUser}
  <PasswordCreateUser on:newuserclose={() => (createNewUser = false)} />
{/if}
{#if forgotPassword}
  <PasswordForgot on:newuserclose={() => (forgotPassword = false)} />
{/if}

<style lang="scss">
  .password-login {
    button {
      padding: 1em;
      width: 100%;
      background-color: var(--primary-color-darken-2);
      outline: none;
      border: none;
      font-weight: 500;
      color: #fffd;
      cursor: pointer;
      filter: brightness(120%);

      &:hover {
        filter: brightness(140%);
      }

      &:disabled {
        cursor: auto;
        filter: contrast(80%) brightness(100%) grayscale(20%);
        pointer-events: none;
      }
    }

    .password-wrap {
      position: relative;

      .forgot-password {
        position: absolute;
        top: 2px;
        right: 0;
        font-size: 0.75em;
        opacity: 0.8;
        text-decoration: underline;
        cursor: pointer;

        &:hover {
          opacity: 1;
        }
      }
    }

    .sign-up {
      margin-top: 1em;
      text-align: center;
      span {
        color: var(--primary-color-lighten-2);
        font-weight: 700;
        margin-left: 0.55em;
        text-decoration: underline;
        cursor: pointer;

        &:hover {
          filter: brightness(120%);
        }
      }
    }
  }
</style>
