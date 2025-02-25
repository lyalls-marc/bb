<script setup>
const { data: user, error }
    = await useSendmarcData(`api/user`);

const { data: domains }
    = await useSendmarcData(`api/customers/${user.value.customer_uuid}/domains`);

const config = useRuntimeConfig();
</script>

<template>
  <div class="p-10 flex flex-col gap-8">
    <Card class="w-full">
      <template #title>
        <div class="flex items-center justify-between">
          Domains
          <Button
            as="a"
            :href="`${config.public.apiUrl}/docs/api#/operations/domains.index`"
            target="_blank"
            rel="noopener"
            label="docs"
            size="small"
          />
        </div>
      </template>
      <template #content>
        <DataTable :value="domains.data" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]">
          <Column header="Name" field="domain_name"/>
          <Column>
            <template #body="{data}">
              <router-link :to="`/customers/${user.customer_uuid}/domains/${data.uuid}`">
                <Button
                  class="float-right"
                  severity="info"
                  label="View Reports"
                  size="small"
                />
              </router-link>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>
