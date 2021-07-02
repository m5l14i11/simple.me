<style type="text/scss">
  .header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0 auto;
    padding: 20px 40px;
  }

  ul {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
  }
</style>

<script lang="ts">
  import Link from "./router/Link.svelte";
</script>

<div class="header">
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/edu">Education</Link></li>
      <li><Link to="/build">Build</Link></li>
      <li><Link to="/blog">Blog</Link></li>
    </ul>
  </nav>
</div>
