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
    count: deals.count,
    items: deals.rows.map(toResponse),
  };
};

module.exports = { toResponse, toResponseList };
