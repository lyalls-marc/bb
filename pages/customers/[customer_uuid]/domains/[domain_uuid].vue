<script setup>
const { params } = useRoute();

const statsEndpoints = {
  domain: `api/customers/${params.customer_uuid}/domains/${params.domain_uuid}`,
  totals: `api/statistics/domains/${params.domain_uuid}/totals`,
  countryTotals: `api/statistics/domains/${params.domain_uuid}/countries`,
  senderTotals: `api/statistics/domains/${params.domain_uuid}/senders`,
  timeline: `api/statistics/domains/${params.domain_uuid}/timeline`
};

const results = await Promise.all(Object.values(statsEndpoints).map(useSendmarcData));

const { domain, totals,  countryTotals, senderTotals, timeline } = Object.fromEntries(
    Object.keys(statsEndpoints).map((key, i) => [key, results[i].data])
);

const config = useRuntimeConfig();
</script>
<template>
  <div class="p-10 flex flex-col gap-8">
    <router-link to="/">
      <Button
        label="Back"
        size="small"
        severity="info"
      />
    </router-link>
    <div class="flex gap-8">
      <Card class="w-full">
        <template #title>
          <div class="flex items-center justify-between">
            Geo data
            <Button
              as="a"
              :href="`${config.public.apiUrl}/docs/api#/operations/statistics.domain.countries`"
              target="_blank"
              rel="noopener"
              label="docs"
              size="small"
            />
          </div>
        </template>
        <template #content>
          <DataTable :value="countryTotals" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]">
            <Column header="Country" field="country_name"/>
            <Column header="Code" field="country"/>
            <Column header="Incidents" field="aggregates.total_incidents"/>
          </DataTable>
        </template>
      </Card>
      <Card class="w-full">
        <template #title>
          <div class="flex items-center justify-between">
            Timeline
            <Button
              as="a"
              :href="`${config.public.apiUrl}/docs/api#/operations/statistics.domain.timeline`"
              target="_blank"
              rel="noopener"
              label="docs"
              size="small"
            />
          </div>
        </template>
        <template #content>
          <DataTable :value="timeline" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]">
            <Column header="Date" field="date"/>
            <Column header="Total Passing">
              <template #body="{data}">
                {{ data.total_passing }}
              </template>
            </Column>
            <Column header="Total Failing">
              <template #body="{data}">
                {{ data.total_failing }}
              </template>
            </Column>
            <Column header="Total Forwards">
              <template #body="{data}">
                {{ data.total_forwards }}
              </template>
            </Column>
          </DataTable>
        </template>
      </Card>
    </div>
    <div class="flex gap-8">
      <Card class="w-full">
        <template #title>
          <div class="flex items-center justify-between">
            Sender data
            <Button
              as="a"
              :href="`${config.public.apiUrl}/docs/api#/operations/statistics.domain.senders`"
              target="_blank"
              rel="noopener"
              label="docs"
              size="small"
            />
          </div>
        </template>
        <template #content>
          <DataTable :value="senderTotals" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]">
            <Column header="Sender" field="sender_organization"/>
            <Column header="Incidents" field="aggregates.total_incidents"/>
          </DataTable>
        </template>
      </Card>
      <Card class="w-full">
        <template #title>
          <div class="flex items-center justify-between">
            Domain details
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
          <div class="flex flex-col">
            <div>Domain score: {{ domain.score.overall_score }}</div>
            <div>Domain rating:  {{ domain.score.overall_rating }}</div>
            <div>Domain risk: {{ domain.score.overall_threat_level }}</div>
          </div>
        </template>
      </Card>
      <Card class="w-full">
        <template #title>
          <div class="flex items-center justify-between">
            Domain totals
            <Button
                as="a"
                :href="`${config.public.apiUrl}/docs/api#/operations/statistics.domain.totals`"
                target="_blank"
                rel="noopener"
                label="docs"
                size="small"
            />
          </div>
        </template>
        <template #content>
          <div class="flex flex-col">
            <pre>{{ totals }}</pre>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>


