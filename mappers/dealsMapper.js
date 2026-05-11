const toResponse = (deal) => {
  return {
    id: deal.id,
    title: deal.title,
    amount: deal.amount,
    status: deal.status,
    deadline: deal.deadline,
    client_id: deal.client_id,
    createdAt: deal.createdAt,
    updatedAt: deal.updatedAt,
  };
};

const toResponseList = ({deals, page, pageSize}) => {
  return {
    page,
    pageSize,
    total: deals.count,
    deals: deals.rows.map(toResponse),
  };
};

module.exports = { toResponse, toResponseList };
